'use strict';

var AWS = require('aws-sdk-mock');
var event, context;

const app = require('../../post_news.js');
const chai = require('chai');
const expect = chai.expect;


describe('Tests post_news', function () {
    it('Checks response header', async () => {
           AWS.mock('DynamoDB', 'put', function (params, callback){
                callback(null, "successfully put item in database");
            });
        event = {
                "body": "{\"date\": \"09-09-1993\",\"title\": \"news title\",\"newsBody\": \"some news from somewhere\"}"
            }
        const result = await app.lambdaSubmit(event, context)
        
        console.log("result::" + JSON.stringify(result));
        expect(result.headers['Access-Control-Allow-Origin']).to.equal("*");
        });
});
