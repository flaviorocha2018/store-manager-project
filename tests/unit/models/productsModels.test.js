const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connection');

const productsModels = require('../../../models/productsModels');

describe('Busca todas os produtos no BD', () => {
  describe('quando não existe nenhum produto criado', () => {
    before(function () {
      const resultadoExecute = [[], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    after(function () {
      connection.execute.restore();
    });
    it('retorna um array', async function () {
      const result = await productsModels.getAll();
      expect(result).to.be.an('array');
    });

    it('o array vazio', async function () {
      const result = await productsModels.getAll();
      expect(result).to.be.empty;
    });
  });
  describe('quando exitem produtos criados', () => {
    before(function () {
      const resultadoExecute = [[{ id: 1, name: 'Martelo de Thor' }], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    it('retorne um array', async function () {
      const resultado = await productsModels.getAll();
      expect(resultado).to.be.an('array');
    });
    it('o array não esteja vazio', async function () {
      const result = await productsModels.getAll();
      expect(result).to.be.not.empty;
    });
    it('o array possua itens do tipo objeto', async function () {
      const result = await productsModels.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('objetos tenham as propriedades: id, name', async function () {
      const result = await productsModels.getAll();
      const item = result[0];
      expect(item).to.include.all.keys('id', 'name');
    });
  });
});
