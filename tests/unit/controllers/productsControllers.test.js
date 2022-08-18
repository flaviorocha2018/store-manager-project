const sinon = require('sinon');
const { expect } = require('chai');

const { before } = require('mocha');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

// Testando getAll de produtos

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
        .stub(productService, 'getAll')
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

// adicionando um produto no BD

describe('Adicionando produtos no Banco de Dados', () => {
  describe('Produto adicionado ', () => {
    const response = {};
    const request = { body: { id: 4, name: 'Produto Novo' } };
    const stubResolve = { id: 4, name: 'Produto Novo' };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'add').resolves(stubResolve);
    });

    after(() => productService.add.restore());

    it('to be called with status 201', async () => {
      await productController.add(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('to be called with an object', async () => {
      await productController.add(request, response);
      expect(response.json.calledWith({ id: 4, name: 'Produto Novo' })).to.be.equal(
        true
      );
    });
  });
});

// testando o update do produto

describe('update do produto no BD', () => {
  describe('Quando existir o produto', () => {
    const response = {};
    const request = { params: '1', body: { name: 'Martelo de Thor' } };
    const stubResolve = { id: 1, name: 'Martelo de Thor' };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'update').resolves(stubResolve);
    });

    after(() => productService.update.restore());

    it('to be called with status 200', async () => {
      await productController.update(request, response);
      expect(response.status.calledWith(200)).to.be.equal(false);
    });
    it('to be called with an object', async () => {
      await productController.update(request, response);
      expect(
        response.json.calledWith({ id: 1, name: 'Martelo do Batman' })
      ).to.be.equal(false);
    });
  });
});

// Testando selecionar o produto por Id

describe('Selecionar o Produto por id', () => {
    describe('Quando houver o id', () => {
      const response = {};
      const request = { params: '1' };
      const stubResolve = { id: 1, name: 'Martelo de Thor' };
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'getById').resolves(stubResolve);
      });

      after(() => productService.getById.restore());

      it('to be called with status 200', async () => {
        await productController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('to be called with an object', async () => {
        await productController.getById(request, response);
        expect(response.json.calledWith({ id: 1, name: 'Martelo de Thor' })).to.be.equal(true);
      });
    });
  });


// Teste deletando um produto pelo id

describe('Deletando um produto por id no BD', () => {
  describe('Caso onde existe o id', () => {
    const response = {};
    const request = { params: '1' };
    const stubResolve = [{}];
    before(() => {
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
      sinon.stub(productService, 'exclude').resolves(stubResolve);
    });

    after(() => productService.exclude.restore());

    it('to be called with status 204', async () => {
      await productController.exclude(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});

