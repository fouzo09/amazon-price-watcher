'use-strict';
const AWS = require('aws-sdk');

const headers = {
  "Access-Control-Allow-Headers" : "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*"
}

module.exports.handler = async (event) => {

    const params = {
        TableName: process.env.TABLE_NAME,
    };
    
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb.scan(params).promise();
    
    if (result.Count === 0) {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify('Aucune donnée trouvée')
        };
    }
    
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          total: result.Count,
          items: await result.Items.map((item) => {
            return {
              id: item.id,
              product_url: item.product_url,
              product_name: item.product_name,
              expected_price: item.expected_price,
              phone: item.phone
            };
          }),
        }),
    };
};
  