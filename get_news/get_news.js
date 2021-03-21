// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
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
        console.log("request received:1" + JSON.stringify(date));
        const data = await getItem(date)
        console.log("data:::" + JSON.stringify(data))
 
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
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
  TableName : 'news_table',
  /* Item properties will depend on your application concerns */
  KeyConditionExpression: '#name = :value',
  ExpressionAttributeValues: { ':value': '09-09-1993' },
  ExpressionAttributeNames: { '#name': 'news_date' }
  }
    
  try {
    console.log(date);  
    const data =  await ddb.query(params).promise()
    console.log("data:" + JSON.stringify(data));
    return data
  } catch (err) {
    console.log("data get exception");  
    console.log(err);
    return err
  }
}
