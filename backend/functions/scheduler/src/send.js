'use-strict';
const AWS = require('aws-sdk');
const sns = new AWS.SNS({apiVersion: '2010-03-31', region: 'us-east-1'});

module.exports.handler = async (event) => {
    const body = JSON.parse(event.Records[0].body);
    
    const params = {
        Message: `Le produit ${body.title} est maintenant disponible à votre prix.`,
        PhoneNumber: '+224623684286',
    };

    try {
        const snsPush = await sns.publish(params).promise();
        console.log(snsPush);  
             
    } catch (e) {
        console.log(e)
    }
};

