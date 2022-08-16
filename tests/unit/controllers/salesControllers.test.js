const sinon = require('sinon');
const { expect } = require('chai');

const { before } = require('mocha');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

describe('Busca todas as vendas no BD', function () {
  describe('quando não existir nenhuma venda criada', function () {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([]);
    });
    after(function () {
      salesService.getAll.restore();
    });

    it('o status seja 200', async function () {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('o array vazio', async function () {
      await salesController.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('quando exitem vendas criadas', function () {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getAll')
        .resolves([{ id: 1, itemsSold: [
              
             { productId: 1, quantity: 5 },
             { productId: 2, quantity: 10 },
          
        ] }]);
    });
    after(function () {
      salesService.getAll.restore();
    });
    it('o status seja 200', async function () {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('o array com os dados', async function () {
      await salesController.getAll(request, response);
      expect(
        response.json.calledWith([
          {
            id: 1,
            itemsSold: [
              { productId: 1, quantity: 5 },
              { productId: 2, quantity: 10 },
            ],
          },
        ])
      ).to.be.equal(true);
    });
  });
});
