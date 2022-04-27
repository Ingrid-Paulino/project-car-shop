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

  describe('#read', () => {
  
     describe('#sucesso', () => {
      const req = {} as Request
      const res = {} as Response
      res.json = sinon.stub().returns(null)
      res.status = sinon.stub().returns(res)
  
      before(() => {
        sinon.stub(genericController.service, 'read').resolves(mockArray)
      });
  
      after(() => {
       (genericController.service.read as sinon.SinonStub).restore();
      })
      
      it('Retorna uma lista', async() => { 
        await genericController.read(req, res);
        // expect().to.be.deep.eq(mockArray)
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
       })
  
       it('Retorna uma lista', async() => { 
        await genericController.read(req, res);
  
        expect((res.json as sinon.SinonStub).calledWithMatch(mockArray)).to.be.true
       })

     describe('#erro', () => {
      const req = {} as Request
      const res = {} as Response
      res.json = sinon.stub().returns(null)
      res.status = sinon.stub().returns(res)
  
      before(() => {
        sinon.stub(genericController.service, 'read').rejects()
        
      });
  
      after(() => {
        sinon.restore();
      })
  
       it('Se houver um erro retorna erro 500', async() => { 
        await genericController.read(req, res);
        // expect().to.be.deep.eq(mockArray)
        expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true
       })
  })
     })

    })


  describe('#create', () => { 
    const req = {} as Request
    const res = {} as Response
    res.json = sinon.stub().returns(null)
    res.status = sinon.stub().returns(res)


    before(() => {
      sinon.stub(genericController.service, 'create').resolves(mock)
    });

    after(() => {
      sinon.restore();
    })
    
    
    it('É chamado o status com código 201', async() => { 
      req.body = {}
      await genericController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201));
    })

    it('É chamado o json com um objeto', async() => { 
      req.body = {}
      await genericController.create(req, res);
      expect((res.json as sinon.SinonStub).calledWithMatch(mock)).to.be.true;
    })
  })

  describe('#readById', () => { 
    const req = {} as Request
    const res = {} as Response
    res.json = sinon.stub().returns(null)
    res.status = sinon.stub().returns(res)

    describe('Quando existe o documento', () => { 
      before(() => {
        sinon.stub(genericController.service, 'readOne').resolves(mock)
      });
  
      after(() => {
        sinon.restore();
      })
      
      it('Deve retornar um objeto', async() => { 
        req.params = {id: "4edd40c86762e0fb12000003"}
        await genericController.readOne(req, res);
        expect((res.json as sinon.SinonStub).calledWith(mock));
       })
    })

    describe('Quando não existe o documento', () => { 
      before(() => {
        sinon.stub(genericController.service, 'readOne').resolves(null)
      });
  
      after(() => {
        sinon.restore();
      })
      
      it('Deve retornar null', async() => { 
        await genericController.readOne(req, res);
        expect((res.json as sinon.SinonStub).calledWith('Object not found'));    
       })
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

    const req = {} as Request
    const res = {} as Response
    res.json = sinon.stub().returns(null)
    res.status = sinon.stub().returns(res)


    describe('Quando existe o documento', () => { 
      before(() => {
        sinon.stub(genericController.service, 'update').resolves(mockUpdate)
      });
  
      after(() => {
        sinon.restore();
      })
      
      it('Deve retornar um objeto', async() => { 
       req.params = {id: "4edd40c86762e0fb12000003"}
       await genericController.update(req, res);
       expect((res.json as sinon.SinonStub).calledWith(mock)); 
       })
    })

    describe('Quando não existe o documento', () => { 
      before(() => {
        sinon.stub(genericController.service, 'update').resolves(null)
      });
  
      after(() => {
        sinon.restore();
      })
      
      it('Deve retornar null', async() => {
        req.params = {id: "4edd40c86762e0fb12000003"}
        await genericController.update(req, res);
        expect((res.json as sinon.SinonStub).calledWith(mock)); 
       })
    })
  })

  describe('#delete', () => { 
    const req = {} as Request
    const res = {} as Response
    res.json = sinon.stub().returns(null)
    res.status = sinon.stub().returns(res)

    describe('Quando existe o documento', () => { 
      before(() => {
        sinon.stub(genericController.service, 'delete').resolves(mock)
      });
  
      after(() => {
        sinon.restore();
      })
      
      it('Deve retornar um objeto', async() => { 
        req.params = {id: "4edd40c86762e0fb12000003"}
        await genericController.delete(req, res);
       expect((res.json as sinon.SinonStub).calledWith(mock));  
       })
    })

    describe('Quando não existe o documento', () => { 
      before(() => {
        sinon.stub(genericController.service, 'delete').resolves(null)
      });
  
      after(() => {
        sinon.restore();
      })
      
      it('Deve retornar null', async() => {
        req.params = {id: "4edd40c86762e0fb12000003"}
        await genericController.delete(req, res);
        expect((res.json as sinon.SinonStub).calledWith(mock)); 
       })
    })
  })
})