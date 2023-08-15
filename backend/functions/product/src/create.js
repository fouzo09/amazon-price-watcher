'use-strict';
const AWS = require('aws-sdk');
const CUSTOMEPOCH = 1300000000000;

const headers = {
  "Access-Control-Allow-Headers" : "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*"
}

module.exports.handler = async (event) => {

    try {
      const body = JSON.parse(event.body);
      const dynamoDb = new AWS.DynamoDB.DocumentClient();
      const params = {
          TableName: process.env.TABLE_NAME,
          Item: {
              id: generateRowId(4),
              product_url: body.product_url,
              product_name: body.product_name,
              expected_price: body.expected_price,
              phone: body.phone
          },
      };

      await dynamoDb.put(params).promise();
    
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify('Produit enregistré avec succes.'),
      };
    } catch (error) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify(error.message),
      };
    }
};


function generateRowId(shardId) {
  var ts = new Date().getTime() - CUSTOMEPOCH;
  var randid = Math.floor(Math.random() * 512);
  ts = (ts * 64); 
  ts = ts + shardId;
  return (ts * 512) + randid;
}