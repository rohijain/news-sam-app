'use strict';

var AWS = require('aws-sdk-mock');

const app = require('../../get_news.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Test get_news', function () {
    it('Validates response headers', async () => {
            AWS.mock('DynamoDB', 'query', function (params, callback){
                callback(null, "successfully query item in database");
            });
 
    
        event = {
                    "queryStringParameters": {
                        "news_date":"09-10-1993"
                    }
        }
        const result = await app.lambdaHandlerGetList(event, context)
        
        console.log("result::" + JSON.stringify(result));
        expect(result.headers['Access-Control-Allow-Origin']).to.equal("http://master3.account-0.aws-tests.skyworkz.nl");
        });
});
