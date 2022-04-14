import { expect } from 'chai';
import mongoose from 'mongoose';
import Sinon from 'sinon';
import GenericServices from '../../../services/GenericServices';
import GenericModel from '../../../models/GenericModel';
// import CarModel from '../../../models/CarsModel';

// import CarSchema from '../../../schemas/carSchema';


describe('GenericService', () => { 
  const GenericSchema = new mongoose.Schema({
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: Boolean,
    buyValue: { type: Number, required: true },
    doorsQty: { type: Number, required: true },
    seatsQty: { type: Number, required: true },
  })

  //pq da ero de class abstract
  // let genericService = new GenericServices(mongoose.model('Generic', GenericSchema));

  let model = new GenericModel((mongoose.model('GENERIC_SERVICE', GenericSchema)));
  // let model = new CarModel();
  let genericService = new GenericServices(model);

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
      Sinon.stub(model.model, 'find').resolves(mockArray as never)
    });

    after(() => {
      Sinon.restore();
    })
    
    it('Retorna uma lista', async() => { 
      const cars = await genericService.read();
      expect(cars).to.be.deep.eq(mockArray)
     })
  })

  describe('#create', () => { 
    before(() => {
      Sinon.stub(genericService.model, 'create').resolves(mock)
    });

    after(() => {
      Sinon.restore();
    })
    
    it('Deve retornar um objeto', async() => { 
      const cars = await genericService.create(mock);
      expect(cars).to.be.deep.equal(mock)
    })
  })

  describe('#readOne', () => { 
    describe('Quando existe o documento', () => { 
      before(() => {
        Sinon.stub(genericService.model, 'readOne').resolves(mock)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar um objeto', async() => { 
        // pq esse readOne vem do servise e não do model?
        const cars = await genericService.readOne(mock._id);
        expect(cars).to.be.deep.eq(mock)
       })
    })

    describe('Quando não existe o documento', () => { 
      before(() => {
        Sinon.stub(genericService.model, 'readOne').resolves(null)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar null', async() => { 
        const cars = await genericService.readOne('9999');
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
        Sinon.stub(genericService.model, 'update').resolves(mockUpdate)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar um objeto', async() => { 
        const cars = await genericService.update(mock._id, mockUpdate);
        expect(cars).to.be.deep.eq(mockUpdate)
       })
    })

    describe('Quando não existe o documento', () => { 
      before(() => {
        Sinon.stub(genericService.model, 'update').resolves(null)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar null', async() => { 
        const cars = await genericService.update('9999', mockUpdate);
        expect(cars).to.be.null;
       })
    })
  })

  describe('#delete', () => { 
    // entender oq meu delete retorna
    describe('Quando existe o documento', () => { 
      before(() => {
        Sinon.stub(genericService.model, 'delete').resolves(mock)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar um objeto', async() => { 
        // pq esse readOne vem do servise e não do model?
        const cars = await genericService.delete(mock._id);
        expect(cars).to.be.deep.eq(mock)
       })
    })

    describe('Quando não existe o documento', () => { 
      before(() => {
        Sinon.stub(genericService.model, 'delete').resolves(null)
      });
  
      after(() => {
        Sinon.restore();
      })
      
      it('Deve retornar null', async() => { 
        const cars = await genericService.delete('9999');
        expect(cars).to.be.null;
       })
    })
  })
})