let response;
let dataResponse;
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

/**
 *
 * @param {Object} event - Get news request parameters.
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * @returns {Object} object - Returns the news date Items
 * 
 */
exports.lambdaHandlerGetList = async (event, context) => {
    try { 
        
        const date = event.queryStringParameters.news_date;
        console.log("request received for date:" + date);
        dataResponse = await getItem(date)
        console.log("data fetched form DB:" + JSON.stringify(dataResponse))
 
        
    } catch (err) {
        console.log(err);
        dataResponse = err;
    }
    
    response = {
            'statusCode': 200,
            'headers': {
                    "Access-Control-Allow-Origin": "http://master3.account-0.aws-tests.skyworkz.nl"
            },
            'body': JSON.stringify({
                newsItems: dataResponse,
            })
        }

    return response
};


/**
 * @param {Object} date for which the news is to be fetch.
 * 
 * @returns {Object} NewItems from the DDB
 * 
 */
async function getItem(date){
  console.log(date);  
  const params = {
    TableName : 'news_app_table',
        KeyConditionExpression: '#name = :value',
        ExpressionAttributeValues: { ':value': date },
        ExpressionAttributeNames: { '#name': 'news_date' }
    }
    const data =  await ddb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
    }).promise();
    
    return data;
   
}
