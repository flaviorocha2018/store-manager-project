const sinon = require('sinon');
const { expect } = require('chai');

const { before } = require('mocha');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

describe('Busca todos os produtos no BD', function () {
  describe('quando não existir nenhum produto criado', function () {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves([]);
    });
    after(function () {
      productService.getAll.restore();
    });

    it('o status seja 200', async function () {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('o array vazio', async function () {
      await productController.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });
  describe('quando exitem produtos criados', function () {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon
        .stub(productService, "getAll")
        .resolves([{ id: 1, name: 'Martelo de Thor'}]);
    });
    after(function () {
      productService.getAll.restore();
    });
    it('o status seja 200', async function () {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('o array com os dados', async function () {
      await productController.getAll(request, response);
      expect(
        response.json.calledWith([{ id: 1, name: 'Martelo de Thor'}])
      ).to.be.equal(true);
    });
  });
});
