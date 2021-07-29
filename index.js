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
    // let albertId = entity.substr(0, 3);
    //entity validation
    let key = categoryId ? { "PK": `${tenantId}#${entity}`, SK: categoryId } : { "PK": `${tenantId}#${entity}`, "SK": `${entity}` };
    const start_t = process.hrtime();
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
                const end_t = process.hrtime(start_t);
                console.log({ "dynamodb_latency": end_t[1] / 1000000 })
                data = data.Attributes ? data.Attributes : data;
                data = data.counter ? data.counter : data;
                data = entity + (categoryId || "") + data;
                resolve(data);
            }
        });
    })
}

module.exports = { generate }