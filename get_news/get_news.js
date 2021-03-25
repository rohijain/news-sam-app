let response;
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandlerGetList = async (event, context) => {
    try { 
        
        console.log("event json::");
        // TODO implement
        const date = event.queryStringParameters.news_date;
        console.log("request received:" + date);
        const data = await getItem(date)
        console.log("data:::" + JSON.stringify(data))
 
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'headers': {
                    "Access-Control-Allow-Origin": "*"
            },
            'body': JSON.stringify({
                newsItems: data,
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
    

    return response
};



async function getItem(date){
  console.log(date);  
  const params = {
  TableName : 'news_app_table',
  /* Item properties will depend on your application concerns */
  KeyConditionExpression: '#name = :value',
  ExpressionAttributeValues: { ':value': date },
  ExpressionAttributeNames: { '#name': 'news_date' }
  }
    
    console.log(date);  
    const data =  await ddb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
    }).promise();
   
}
