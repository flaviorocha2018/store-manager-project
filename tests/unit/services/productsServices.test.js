const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productService = require('../../../services/productService');
const productModel = require('../../../models/productsModels');

describe('Busca todos os produtos no BD', () => {
  describe('quando não existe nenhum produto criado', () => {
    before(function () {
      sinon.stub(productModel, 'getAll').resolves([]);
    });
    after(function () {
      productModel.getAll.restore();
    });
    it('retorna um array', async function () {
      const result = await productService.getAll();
      expect(result).to.be.an('array');
    });

    it('o array vazio', async function () {
      const result = await productService.getAll();
      expect(result).to.empty;
    });
  });
  describe('quando exitem produtos criados', () => {
    before(function () {
      sinon
        .stub(productModel, 'getAll')
        .resolves([{ id: 1, name: 'Martelo de Thor' }]);
    });
    after(function () {
      productModel.getAll.restore();
    });
    it('retorne um array', async function () {
      const result = await productService.getAll();
      expect(result).to.be.an('array');
    });
    it('o array não esteja vazio', async function () {
      const result = await productService.getAll();
      expect(result).to.not.empty;
    });
    it('o array possua itens do tipo objeto', async function () {
      const result = await productService.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('objetos tenham as propriedades: id e name', async function () {
      const result = await productService.getAll();
      expect(result[0]).to.all.keys('id', 'name');
    });
  });
});
