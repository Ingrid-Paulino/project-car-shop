import { Response, Request } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import mongoose from 'mongoose';
import GenericController from '../../../controllers/GenericController';
import GenericModel from '../../../models/GenericModel';
import GenericService from '../../../services/GenericServices';
import CarSchemaZod from '../../../interfaces/CarInterface';


const { expect } = chai;


describe('GenericController', () => {
  const GenericSchema = new mongoose.Schema({
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: Boolean,
    buyValue: { type: Number, required: true },
    doorsQty: { type: Number, required: true },
    seatsQty: { type: Number, required: true },
  })

  let model = new GenericModel(mongoose.model('GENERIC_', GenericSchema));
  let service = new GenericService(model, CarSchemaZod);
  let genericController = new GenericController(service, '/');

  const mock = {
    _id: "4edd40c86762e0fb12000003",
    model: "Fiat Uno",
    year: 1963,
    color: "blue",
    buyValue: 3500,
    seatsQty: 4,
    doorsQty: 4
  };

  const mockArray = [mock];

  const makeRes = () => {
    const res = {} as Response

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(sinon.stub)
    return res
  }

  describe('#read', () => {
    // beforeEach(sinon.restore)
    afterEach(() => sinon.restore())
    const req = {} as Request

    it('Retorna status 200', async () => {
      sinon.stub(genericController.service, 'read').resolves(mockArray)
      const res = makeRes()
      // res.json = sinon.stub().returns(null)
      // res.status = sinon.stub().returns(res)
      await genericController.read(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(200)
    })

    it('Retorna uma lista', async () => {
      sinon.stub(genericController.service, 'read').resolves(mockArray)
      const res = makeRes()
      // res.json = sinon.stub().returns(null)
      // res.status = sinon.stub().returns(res)
      await genericController.read(req, res);
      expect((res.json as sinon.SinonStub).getCall(0).args[0]).to.deep.eq(mockArray)
    })

    it('Se houver um erro retorna erro 500', async () => {
      sinon.stub(genericController.service, 'read').rejects()
      const res = makeRes()
      // res.json = sinon.stub()
      // res.status = sinon.stub().returns(res)
      await genericController.read(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(500)
    })
  })


  describe('#create', () => {
    // beforeEach(() => sinon.restore())
    afterEach(() => sinon.restore())
    const req = {} as Request

    it('É chamado o status com código 201', async () => {
      req.body = {}
      sinon.stub(genericController.service, 'create').resolves(mock)
      const res = makeRes()
      await genericController.create(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(201);
    })

    it('É chamado o json com um objeto', async () => {
      sinon.stub(genericController.service, 'create').resolves(mock)
      req.body = {}
      const res = makeRes()
      await genericController.create(req, res);
      expect((res.json as sinon.SinonStub).getCall(0).args[0]).to.deep.eq(mock)
    })

    it('Se houver um erro retorna erro 500', async () => {
      sinon.stub(genericController.service, 'create').rejects()
      const res = makeRes()
      await genericController.create(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(500)
    })

    it('Deve retornar null se não existir o obj', async () => {
      sinon.stub(genericController.service, 'create').resolves(null)
      const res = makeRes()
      await genericController.create(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(500)
    })

    it('Deve retornar status 400', async () => {
      sinon.stub(genericController.service, 'create').resolves({ error: {
        issues: [{
          message: 'Expected number, received string',
        }],
      } })
      const res = makeRes()
      await genericController.create(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(400)
    })
  })

  describe('#readById', () => {
    afterEach(() => sinon.restore())

    const req = {} as Request
    it('Deve retornar um objeto', async () => {
      sinon.stub(genericController.service, 'readOne').resolves(mock)
      req.params = { id: "4edd40c86762e0fb12000003" }
      const res = makeRes()
      await genericController.readOne(req, res);
      expect((res.json as sinon.SinonStub).getCall(0).args[0]).to.deep.eq(mock)
    })

    it('Deve retornar null', async () => {
      sinon.stub(genericController.service, 'readOne').resolves(null)
      const res = makeRes()
      await genericController.readOne(req, res);
      expect((res.json as sinon.SinonStub).getCall(0).args[0]).to.deep.eq({ error: 'Object not found' })
    })

    it('Se houver um erro retorna erro 500', async () => {
      sinon.stub(genericController.service, 'readOne').rejects()
      const res = makeRes()
      await genericController.readOne(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(500)
    })
  })



  describe('#update', () => {
    const mockUpdate = {
      _id: "4edd40c86762e0fb12000003",
      model: "Fiat Uno",
      year: 1990,
      color: "read",
      buyValue: 30500,
      seatsQty: 4,
      doorsQty: 4
    }

    afterEach(() => sinon.restore())
    const req = {} as Request

    it('Retorna status 200', async () => {
      req.params = { id: "4edd40c86762e0fb12000003" }
      sinon.stub(genericController.service, 'update').resolves(mockUpdate)
      const res = makeRes()
      await genericController.update(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(200)
    })

    it('Deve retornar um objeto', async () => {
      sinon.stub(genericController.service, 'update').resolves(mockUpdate)
      req.params = { id: "4edd40c86762e0fb12000003" }
      const res = makeRes()
      await genericController.update(req, res);
      expect((res.json as sinon.SinonStub).getCall(0).args[0]).to.eq(mockUpdate);
    })

    it('Se houver um erro retorna erro 500', async () => {
      req.params = { id: "4edd40c86762e0fb12000003" }
      sinon.stub(genericController.service, 'update').rejects()
      const res = makeRes()
      await genericController.update(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(500)
    })

    it('Deve retornar null se não existir o obj', async () => {
      sinon.stub(genericController.service, 'update').resolves(null)
      const res = makeRes()
      await genericController.update(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(404)
    })

    it('Deve retornar status 400', async () => {
      sinon.stub(genericController.service, 'update').resolves({ error: {
        issues: [{
          message: 'Expected number, received string',
        }],
      } })
      const res = makeRes()
      await genericController.update(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(400)
    })
  })

  describe('#delete', () => {
    afterEach(() => sinon.restore())
    const req = {} as Request

    it('Retorna status 204', async () => {
      req.params = { id: "4edd40c86762e0fb12000003" }
      sinon.stub(genericController.service, 'delete').resolves(mock)
      const res = makeRes()
      await genericController.delete(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(204)
    })

    it('Deve retornar um objeto', async () => {
      sinon.stub(genericController.service, 'delete').resolves(mock)
      req.params = { id: "4edd40c86762e0fb12000003" }
      const res = makeRes()
      await genericController.delete(req, res);
      expect((res.json as sinon.SinonStub).getCall(0).args[0]).to.eq(mock)
    })

    // it('Deve retornar um objeto', async () => {
    //   req.params = { id: "0003" }
    //   sinon.stub(genericController.service, 'delete').resolves(mock)
    //   const res = makeRes()
    //   const response = await genericController.delete(req, res);

    //   expect(response).to.be.eq({ error: 'Id must have 24 hexadecimal characters' })


    //   // expect((res.json as sinon.SinonStub).getCall(0).args[0]).to.eq({ error: 'Id must have 24 hexadecimal characters' })
    // })

    it('Se houver um erro retorna erro 500', async () => {
      req.params = { id: "4edd40c86762e0fb12000003" }
      sinon.stub(genericController.service, 'delete').rejects()
      const res = makeRes()
      await genericController.delete(req, res);
      expect((res.status as sinon.SinonStub).getCall(0).args[0]).to.eq(500)
    })

    // it('Deve retornar null', async () => {
    //   sinon.stub(genericController.service, 'delete').resolves(null)
    //   const res = makeRes()
    //   await genericController.delete(req, res);
    //   expect((res.json as sinon.SinonStub).getCall(0).args[0]).to.deep.eq({ error: 'Id must have 24 hexadecimal characters' })
    // })
  })

})

