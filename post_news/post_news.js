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
exports.lambdaSubmit = async (event, context) => {
        // const ret = await axios(url);
        
    try{
            
        console.log("event:::");
        
        const requestBody = JSON.parse(event.body);
        const date = requestBody.news_date;
        const title = requestBody.news_title;
        const newsBody = requestBody.news_body;
        
        const data = createNewsItem(date, title, newsBody)
        
        console.log("object::" + data);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                newsItems: data
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

function createNewsItem(date, title, newsBody) {
    
    return ddb.put({
        TableName: 'NewsItems',
        Item: {
            news_date: date,
            news_title: title,
            news_body: newsBody
        },
    }, (error) => {
    if (error) {
      console.log('Error creating Todo: ', error);
      return error;
    }

  });
    
    //TODO: catch ddb write exceptions
}
