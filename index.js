var AWS = require('aws-sdk');
var DynamoDB = new AWS.DynamoDB({ region: 'us-west-2' });
var docClient = new AWS.DynamoDB.DocumentClient({ service: DynamoDB });
const dotenv = require('dotenv').config()
var entityCategory = require('./category.json');

/**
 * To generate albertId
 * @param {Integer} tenantId 
 * @param {String} entity - Inventory, Company, etc.
 * @param {String} categoryId - A,B,C,D
 * @returns {Object}
 */

module.exports = function (tbName) {
    const table = tbName;
    generate = async (tenantId, entity, categoryId = "", counterOnly = false) => {
        try {
            if (!(entityCategory[entity] && (entityCategory[entity].length < 1 || entityCategory[entity].includes(categoryId)))) {
                throw "The entity and category is not allowed"
            }
            let key = { PK: `${tenantId}#CNT`, SK: `${entity}${categoryId}` };
            let data = await docClient.update({
                "TableName": table,
                "ReturnValues": "UPDATED_NEW",
                "ExpressionAttributeValues": {
                    ":a": 1,
                    ":zero": 0
                },
                "ExpressionAttributeNames": {
                    "#v": "counter"
                },
                "UpdateExpression": "SET #v = if_not_exists(#v, :zero) + :a",
                "Key": key
            }).promise();
            data = data.Attributes ? data.Attributes : data;
            data = data.counter ? data.counter : data;
            data = counterOnly ? data : (entity + (categoryId || "") + data);
            return data;
        } catch (exception) {
            exception = exception.message || exception;
            return { error: exception }
        }
    }
    return { table, generate };
}