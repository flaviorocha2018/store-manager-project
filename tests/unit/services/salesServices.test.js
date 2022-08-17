const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');
const productService = require('../../../services/productService');



describe('Busca todas as vendas no BD', () => {
  describe('quando não existe nenhuma venda criada', () => {
    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([]);
    });
    after(() => {
      sinon.restore();
    });
    it('retorna um array', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });

    it('o array vazio', async () => {
      const result = await salesService.getAll();
      expect(result.length).to.equal(0);
    });
  });
  describe('quando exitem produtos criados', () => {
    before(() => {
      sinon.stub(salesModel, "getAll").resolves([
        {
          saleId: 1,
          date: "2022-08-17T17:30:37.000Z",
          productId: 2,
          quantity: 2,
        },
      ]);
    });
    after(() => {
      sinon.restore();
    });
    it('retorne um array', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });
    it('o array não esteja vazio', async () => {
      const result = await salesService.getAll();
      expect(result).to.not.empty;
    });
    it('o array possua itens do tipo objeto', async () => {
      const result = await salesService.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('objetos tenham as propriedades: id, productId e quantuty', async () => {
      const result = await salesService.getAll();
      expect(result[0]).to.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});
