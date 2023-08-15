'use-strict';
const AWS = require('aws-sdk');
const axios = require("axios");
const cheerio = require("cheerio");

const sqs = new AWS.SQS({
  region: 'us-east-1'
});

module.exports.handler = async (event, context, callback) => {

    const accountId = context.invokedFunctionArn.split(":")[4];
    const queueUrl = `${process.env.MATCHING_PRODUCT_QUEUE_NAME}`;
    var responseBody = {
          message: ''
    };
    var responseCode = 200;

    const params = {
        TableName: process.env.TABLE_NAME,
    };
    
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb.scan(params).promise();
    
    if (result.Count === 0) {
      console.log("La liste des produits est vide.");
    }else{

      const items = [];
      const products = result.Items;
  
      for (let index = 0; index < products.length; index++) {

        if(price <= products[index].expected_price ){
          const {title, price} = await scrappeProduct(products[index].product_url);
          const queueParams = {
            MessageBody: JSON.stringify({title, price, phone: products[index].phone}),
            QueueUrl: queueUrl
          };

          sqs.sendMessage(queueParams, function(err, data) {
              if (err) {
                  console.log('error:', "failed to send message" + err);
              } else {
                  console.log('data:', data.MessageId);
                  responseBody.message = 'Sent to ' + queueUrl;
                  responseBody.messageId = data.MessageId;

                  console.log(JSON.stringify(responseBody));
              }
          });
        }
      }
    }
};

async function scrappeProduct(productUrl){
  const response = await axios.get(productUrl, {
    headers: {
      Accept: "application/json",
      "User-Agent": "axios 0.21.1"
    }
  });

  const $ = cheerio.load(response.data);

  const title = $('#productTitle').text().trim();
  const price = $('.a-offscreen').first().text().trim();

  return {title, price};
}
  