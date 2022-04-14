import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import GenericModel from '../../../models/GenericModel';
// import CarSchema from '../../../schemas/carSchema';


describe('GenericModel', () => { 
  const GenericSchema = new mongoose.Schema({
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: Boolean,
    buyValue: { type: Number, required: true },
    doorsQty: { type: Number, required: true },
    seatsQty: { type: Number, required: true },
  })

  let genericModel = new GenericModel(mongoose.model('Generic', GenericSchema));

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
    before(() => {
      Sinon.stub(genericModel.model, 'find').resolves(mockArray)
    });

    after(() => {
      Sinon.restore();
    })
    
    it('Retorna uma lista', async() => { 
      const cars = await genericModel.read();
      expect(cars).to.be.deep.eq(mockArray)
     })
  })

  describe('#create', () => { 
    before(() => {
      Sinon.stub(genericModel.model, 'create').resolves(mock)
    });

    after(() => {
      Sinon.restore();
    })
    
    it('Deve retornar um objeto', async() => { 
      const cars = await genericModel.create(mock);
      expect(cars).to.be.deep.equal(mock)
    })
  })

  describe('#readById', () => { 
    describe('Quando existe o documento', () => { 
      before(() => {
        Sinon.stub(genericModel.model, 'findById').resolves(mock)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar um objeto', async() => { 
        // pq esse readOne vem do servise e não do model?
        const cars = await genericModel.readOne(mock._id);
        expect(cars).to.be.deep.eq(mock)
       })
    })

    describe('Quando não existe o documento', () => { 
      before(() => {
        Sinon.stub(genericModel.model, 'findById').resolves(null)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar null', async() => { 
        const cars = await genericModel.readOne('9999');
        expect(cars).to.be.null;
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

    describe('Quando existe o documento', () => { 
      before(() => {
        Sinon.stub(genericModel.model, 'findByIdAndUpdate').resolves(mockUpdate)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar um objeto', async() => { 
        const cars = await genericModel.update(mock._id, mockUpdate);
        expect(cars).to.be.deep.eq(mockUpdate)
       })
    })

    describe('Quando não existe o documento', () => { 
      before(() => {
        Sinon.stub(genericModel.model, 'findByIdAndUpdate').resolves(null)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar null', async() => { 
        const cars = await genericModel.update('9999', mockUpdate);
        expect(cars).to.be.null;
       })
    })
  })

  describe('#delete', () => { 
    // entender oq meu delete retorna
    describe('Quando existe o documento', () => { 
      before(() => {
        Sinon.stub(genericModel.model, 'findByIdAndDelete').resolves(mock)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar um objeto', async() => { 
        // pq esse readOne vem do servise e não do model?
        const cars = await genericModel.delete(mock._id);
        expect(cars).to.be.deep.eq(mock)
       })
    })

    describe('Quando não existe o documento', () => { 
      before(() => {
        Sinon.stub(genericModel.model, 'findById').resolves(null)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar null', async() => { 
        const cars = await genericModel.readOne('9999');
        expect(cars).to.be.null;
       })
    })
  })
})