const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

describe('Busca todas as vendas no BD', () => {
  describe('quando não existe nenhuma venda criada', () => {
    before(() => {
      const resultadoExecute = [[], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    after(() => {
      sinon.restore();
    });
    it('retorna um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    });

    it('o array vazio', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.empty;
    });
  });

  describe('quando exitem vendas criadas', () => {
    before(() => {
      const resultadoExecute = [
        [{ 
          saleId: 1,
          date: "2022-08-17T17:30:37.000Z",
          productId: 2,
          quantity: 2,
        
          },],[],
      ];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    after(() => {
      sinon.restore();
    })
    it('retorne um array', async () => {
      const resultado = await salesModel.getAll();
      expect(resultado).to.be.an('array');
    });
    it('o array não esteja vazio', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.not.empty;
    });
    it('o array possua itens do tipo objeto', async () => {
      const result = await salesModel.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('objetos tenham as propriedades: id, date, productId, quantity', async () => {
      const result = await salesModel.getAll();
      const item = result[0];
      expect(item).to.include.all.keys('saleId', 'date','productId', 'quantity');
    });
  });
});
