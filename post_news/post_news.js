
let response;
let responseString;


const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

/**
 *
 * @param {Object} event - News Items request parameters.
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * @returns {Object} object - Returns success/failure response
 * 
 */
exports.lambdaSubmit = async (event, context) => {
    
    responseString = "";        
    try{
            
        const requestBody = JSON.parse(event.body);
        const date = requestBody.news_date;
        const title = requestBody.news_title;
        const newsBody = requestBody.news_body
        
        console.log("news item::" + date + ":" + title + ":" + newsBody);
        
        await createNewsItem(date, title, newsBody);
        
        
    } catch (err) {
        console.log(err);
        responseString =  "ERROR:" + JSON.stringify(err);
    }
    response = {
            'statusCode': 200,
            'headers': {
                    "Access-Control-Allow-Origin": "http://master3.account-0.aws-tests.skyworkz.nl"
            },
            'body': JSON.stringify({
                'newsItems': responseString
            })
        }

    return response
};

/**
 * Writes new item to the DB
 * @param {Object} news_date for which the news is to be fetch.
 * @param {Object} news_title for which the news is to be fetch.
 * @param {Object} news_body for which the news is to be fetch.
 * 
 * 
 */
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
