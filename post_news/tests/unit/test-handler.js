'use strict';

var AWS = require('aws-sdk-mock');

const app = require('../../post_news.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('Tests post_news', function () {
    it('throw DDB exception while posting', async () => {
           AWS.mock('DynamoDB', 'put', function (params, callback){
                callback(null, "successfully put item in database");
            });
        event = {
                "body": "{\"date\": \"09-09-1993\",\"title\": \"news title\",\"newsBody\": \"some news from somewhere\"}"
            }
        const result = await app.lambdaSubmit(event, context)
        
        console.log("result::" + JSON.stringify(result));
        expect(result.statusCode).to.equal(400);
        expect(result.message).to.be.an('string');
        expect(result.message).to.be.equal('One or more parameter values were invalid: Missing the key news_date in the item');
    });
});
