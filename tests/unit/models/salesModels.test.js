const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const salesModel require('../../../models/salesModel');

describe('Busca todas as vendas no BD', () => {
  describe('quando não existe nenhuma venda criada', () => {
    before(function () {
      const resultadoExecute = [[], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    after(function () {
      connection.execute.restore();
    });
    it('retorna um array', async function () {
      const result = await salesModels.getAll();
      expect(result).to.be.an('array');
    });

    it('o array vazio', async function () {
      const result = await salesModels.getAll();
      expect(result).to.be.empty;
    });
  });

  describe('quando exitem vendas criadas', () => {
    before(function () {
      const resultadoExecute = [
        [{id: 1,
            itemsSold: [
              { productId: 1, quantity: 5 },
              { productId: 2, quantity: 10 },
            ],
          },],[],
      ];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    it('retorne um array', async function () {
      const resultado = await salesModels.getAll();
      expect(resultado).to.be.an('array');
    });
    it('o array não esteja vazio', async function () {
      const result = await salesModels.getAll();
      expect(result).to.be.not.empty;
    });
    it('o array possua itens do tipo objeto', async function () {
      const result = await salesModels.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('objetos tenham as propriedades: id, productId, quantity', async function () {
      const result = await salesModels.getAll();
      const item = result[0];
      expect(item).to.include.all.keys('id', 'productId', 'quantity');
    });
  });
});
