const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');


describe('Busca todas as vendas no BD', () => {
  describe('quando não existe nenhuma venda criada', () => {
    before(function () {
      sinon.stub(salesModel, 'getAll').resolves([]);
    });
    after(function () {
      salesModel.getAll.restore();
    });
    it('retorna um array', async function () {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });

    it('o array vazio', async function () {
      const result = await productService.getAll();
      expect(result).to.empty;
    });
  });
  describe('quando exitem produtos criados', () => {
    before(function () {
      sinon.stub(salestModel, "getAll").resolves([
        {
          id: 1,
          itemsSold: [
            { productId: 1, quantity: 5 },
            { productId: 2, quantity: 10 },
          ],
        },
      ]);
    });
    after(function () {
      salesModel.getAll.restore();
    });
    it('retorne um array', async function () {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });
    it('o array não esteja vazio', async function () {
      const result = await salesService.getAll();
      expect(result).to.not.empty;
    });
    it('o array possua itens do tipo objeto', async function () {
      const result = await salesService.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('objetos tenham as propriedades: id, productId e quantuty', async function () {
      const result = await salesService.getAll();
      expect(result[0]).to.all.keys('id', 'productId', 'quantity');
    });
  });
});
