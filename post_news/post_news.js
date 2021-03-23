
let response;


const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com"
});

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
        
    try{
            
        console.log("event:::");
        
        const requestBody = JSON.parse(event.body);
        const date = requestBody.news_date;
        const title = requestBody.news_title;
        const newsBody = requestBody.news_body
        
        console.log("news item::" + date + ":" + title + ":" + newsBody);
        
        await createNewsItem(date, title, newsBody);
        
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                'newsItems': 'dataString'
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

async function createNewsItem(news_date, news_title, news_body) {
    
    var params = {
    TableName:'news_app_table',
    Item:{
        'news_date': news_date,
        'news_title': news_title,
        'news_body': news_body
    }
};

console.log("Adding a new item...");
await ddb.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
}).promise();
}
