'use strict';

var AWS = require('aws-sdk-mock');

const app = require('../../get_news.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests get_news', function () {
    it('create create DDB exception while get news item', async () => {
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
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);
        expect(response).to.be.an('object');
        expect(response.newsItems.message).to.be.equal("Missing region in config");
    });
});
