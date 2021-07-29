// Require packages
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert, expect } = chai;
chai.use(chaiHttp);
const { generate } = require('../index');

//Variable declaration
let tenantId = "ten1";
let entity = "inventory";
let categoryId = "A";


describe("*** Method : GET - generate Service ***", async function (done) {

    it('generate : Positive Scenario --> data exists', async () => {
        let generated = await generate(tenantId, entity, categoryId);
        assert.ok(generated);
        expect(generated).to.be.a('string');
    }).timeout(5000);

    it('generate : Negative Scenario --> data does not exist', async () => {
        let generated = await generate(tenantId, entity, "");
        expect(generated).to.be.a('object');
        expect(generated).to.have.own.property('error').to.deep.equal('The provided key element does not match the schema');
    })
    done()
})
