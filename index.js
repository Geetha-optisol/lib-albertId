var AWS = require('aws-sdk');
var DynamoDB = new AWS.DynamoDB({ region: 'us-west-2' });
var docClient = new AWS.DynamoDB.DocumentClient({ service: DynamoDB });
const dotenv = require('dotenv').config()

/**
 * To generate albertId
 * @param {Integer} tenantId 
 * @param {String} entity - Inventory, Company, etc.
 * @param {String} categoryId - A,B,C,D
 * @returns {Object}
 */
async function generate(tenantId, entity, categoryId) {
    let albertId = (entity === "Company") ? "com" : (entity === "Inventory") ? "inv" : entity;
    let key = categoryId ? { "PK": `ten${tenantId}#${albertId}`, SK: categoryId } : { "PK": `ten${tenantId}#${albertId}` };
    return new Promise(function (resolve, reject) {
        docClient.update({
            "TableName": process.env.TABLE,
            "ReturnValues": "UPDATED_NEW",
            "ExpressionAttributeValues": {
                ":a": 1
            },
            "ExpressionAttributeNames": {
                "#v": process.env.ATTRIBUTE
            },
            "UpdateExpression": "SET #v = #v + :a",
            "Key": key
        }, function (err, data) {
            if (err) resolve({ error: err.message });
            else {
                data = data.Attributes ? data.Attributes : data;
                data = data.counter ? data.counter : data;
                data = albertId + categoryId + data;
                resolve(data);
            }
        });
    })
}

module.exports = { generate }