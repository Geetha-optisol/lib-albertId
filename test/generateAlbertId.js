// Require packages
const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert, expect } = chai;
chai.use(chaiHttp);
const IdGenerator = require('../index')('albert-dev');

//Variable declaration
let tenantId = "TEN0";
let entity = "INV";
let categoryId = "A";


describe("*** Method : GET - generate Service ***", async function (done) {

    it('generate : Positive Scenario --> data exists', async () => {
        let generated = await IdGenerator.generate(tenantId, entity, categoryId);
        assert.ok(generated);
        expect(generated).to.be.a('string');
    }).timeout(5000);

    it('generate : Positive Scenario --> data exists with counterOnly', async () => {
        let generated = await IdGenerator.generate(tenantId, entity, categoryId, true);
        assert.ok(generated);
        expect(generated).to.be.a('number');
    }).timeout(5000);

    it('generate : Positive Scenario --> data exists without category', async () => {
        let generated = await IdGenerator.generate(tenantId, 'COM');
        assert.ok(generated);
        expect(generated).to.be.a('string');
    }).timeout(5000);


    it('generate : Positive Scenario --> data does not exist with right category', async () => {
        let generated = await IdGenerator.generate(tenantId, 'TNY');
        assert.ok(generated);
        expect(generated).to.be.a('string');
    }).timeout(5000);


    it('generate : Negative Scenario --> data does not exist with wrong category', async () => {
        let generated = await IdGenerator.generate(tenantId, entity, "");
        expect(generated).to.be.a('object');
        expect(generated).to.have.own.property('error').to.deep.equal('The entity and category is not allowed');
    })
    done()
})