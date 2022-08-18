const sinon = require('sinon');
const { expect } = require('chai');

const { before } = require('mocha');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

// Testando selecionar todas as Vendas com getAll

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

// Adicionando Vendas no BD.

describe('Adicionando um venda no BD', () => {
  describe('Quando a venda existir produtos', () => {
    const response = {};
    const request = {
      body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };
    const stubResolve = {
      id: 3,
      itemsSold: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 5 },
      ],
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'addSalesProducts').resolves(stubResolve);
    });

    after(() => salesService.addSalesProducts.restore());

    it('is called with status 201', async () => {
      await salesController.addSalesProducts(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('to be called with an object', async () => {
      const expected = {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 2 },
        ],
      };
      await salesController.addSalesProducts(request, response);
      expect(response.json.calledWith(expected)).to.be.equal(false);
    });
  });
});

// Selecionando um Venda por Id.

describe('Selecionando um venda por id', () => {
    describe('Onde houver o id da venda', () => {
      const response = {};
      const request = { params: '1' };
        const stubResolve = [
          {
            date: '2022-08-18T15:30:00.000Z',
            productId: 1,
            quantity: 1,
          },
          {
            date: '2022-08-18T15:30:00.000Z',
            productId: 2,
            quantity: 2
          }
        ];
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getById').resolves(stubResolve);
      });

      after(() => salesService.getById.restore());

      it('to be called with status 200', async () => {
        await salesController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('to be called with an object', async () => {
        await salesController.getById(request, response);
        expect(response.json.calledWith([
          {
            date: '2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 2,
          },
          {
            date: '2021-09-09T04:54:54.000Z',
            productId: 2,
            quantity: 2
          }
        ])).to.be.equal(false);
      });
    })
  });

// Testando update de uma venda por Id.

describe('Controller update sale in Database', () => {
  describe('Success case', () => {
    const response = {};
    const request = { params: '1', body: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ]};
    const stubResolve = {
      saleId: 1,
      itemsUpdated: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'updateSales').resolves(stubResolve);
    });

    after(() => salesService.updateSales.restore());

    it('to be called with status 200', async () => {
      await salesController.updateSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('to be called with an object', async () => {
      const expected = {
        saleId: 1,
        itemsUpdated: [
          { productId: 1, quantity: 10 },
          { productId: 2, quantity: 50 },
        ],
      };
      await salesController.updateSales(request, response);
      expect(response.json.calledWith(expected)).to.be.equal(false);
    });
  });
});