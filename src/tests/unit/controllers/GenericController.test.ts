// import * as sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import mongoose from 'mongoose';
// import GenericController from '../../../controllers/GenericController';
// import GenericModel from '../../../models/GenericModel';
// import app from '../../../app';


// chai.use(chaiHttp);
// const { expect } = chai;


// describe('GenericController', () => { 
//   const GenericSchema = new mongoose.Schema({
//     model: { type: String, required: true },
//     year: { type: Number, required: true },
//     color: { type: String, required: true },
//     status: Boolean,
//     buyValue: { type: Number, required: true },
//     doorsQty: { type: Number, required: true },
//     seatsQty: { type: Number, required: true },
//   })

//   let model = new GenericModel(mongoose.model('GENERIC_', GenericSchema));
//   let genericController = new GenericController(model);

//   const mock = {
//     _id: "4edd40c86762e0fb12000003",
//     model: "Fiat Uno",
//     year: 1963,
//     color: "blue",
//     buyValue: 3500,
//     seatsQty: 4,
//     doorsQty: 4
//   };

//   const mockArray = [mock];

//   describe('#read', () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       // response.status = sinon.stub().returns(response)
//       // response.json = sinon.stub().returns(response)

//       sinon.stub(genericController.model, 'read').resolves(mockArray)
//     });

//     after(() => {
//       sinon.restore();
//     })
    
//     it('Retorna uma lista', async() => { 
//       const cars = await genericController.read();
//       expect(cars).to.be.deep.eq(mockArray)
//      })
//   })

//   describe('#create', () => { 
//     const response = {};
//     const request = {};
//     let chaiHttpResponse: Response;

//     before(() => {
//       response.status = sinon.stub().returns(response)
//       response.json = sinon.stub().returns(response)

//       sinon.stub(genericController.model, 'create').resolves(mock)
//     });

//     after(() => {
//       sinon.restore();
//     })
    
    
//     it('É chamado o status com código 201', async() => { 
//       chaiHttpResponse = await chai.request(app).post('/matchs')
//       expect(chaiHttpResponse).to.have.status(201);
//       // await genericController.create(request, response);
//       // expect(response.status.calledWith(201)).to.be.equal(true);
//     })

//     it('É chamado o json com um objeto', async() => { 
//       await genericController.create(request, response);
//       expect(response.json.calledWith(mock)).to.be.equal(true);
//     })
//   })

// //   describe('#readById', () => { 
// //     describe('Quando existe o documento', () => { 
// //       before(() => {
// //         Sinon.stub(genericController.model, 'findById').resolves(mock)
// //       });
  
// //       after(() => {
// //         Sinon.restore();
// //       })
      
// //       it('Deve retornar um objeto', async() => { 
// //         // pq esse readOne vem do servise e não do model?
// //         const cars = await genericController.readOne(mock._id);
// //         expect(cars).to.be.deep.eq(mock)
// //        })
// //     })

// //     describe('Quando não existe o documento', () => { 
// //       before(() => {
// //         Sinon.stub(genericController.model, 'findById').resolves(null)
// //       });
  
// //       after(() => {
// //         Sinon.restore();
// //       })
      
//       it('Deve retornar null', async() => { 
//         const cars = await genericController.readOne('9999');
//         expect(cars).to.be.null;
//        })
//     })
//   })


//   describe('#update', () => { 
//     const mockUpdate = {
//       _id: "4edd40c86762e0fb12000003",
//       model: "Fiat Uno",
//       year: 1990,
//       color: "read",
//       buyValue: 30500,
//       seatsQty: 4,
//       doorsQty: 4
//     }

//     describe('Quando existe o documento', () => { 
//       before(() => {
//         Sinon.stub(genericController.model, 'findByIdAndUpdate').resolves(mockUpdate)
//       });
  
//       after(() => {
//         Sinon.restore();
//       })
      
//       it('Deve retornar um objeto', async() => { 
//         const cars = await genericController.update(mock._id, mockUpdate);
//         expect(cars).to.be.deep.eq(mockUpdate)
//        })
//     })

//     describe('Quando não existe o documento', () => { 
//       before(() => {
//         Sinon.stub(genericController.model, 'findByIdAndUpdate').resolves(null)
//       });
  
//       after(() => {
//         Sinon.restore();
//       })
      
//       it('Deve retornar null', async() => { 
//         const cars = await genericController.update('9999', mockUpdate);
//         expect(cars).to.be.null;
//        })
//     })
//   })

//   describe('#delete', () => { 
//     // entender oq meu delete retorna
//     describe('Quando existe o documento', () => { 
//       before(() => {
//         Sinon.stub(genericController.model, 'findByIdAndDelete').resolves(mock)
//       });
  
//       after(() => {
//         Sinon.restore();
//       })
      
//       it('Deve retornar um objeto', async() => { 
//         // pq esse readOne vem do servise e não do model?
//         const cars = await genericController.delete(mock._id);
//         expect(cars).to.be.deep.eq(mock)
//        })
//     })

//     describe('Quando não existe o documento', () => { 
//       before(() => {
//         Sinon.stub(genericController.model, 'findByIdAndDelete').resolves(null)
//       });
  
//       after(() => {
//         Sinon.restore();
//       })
      
//       it('Deve retornar null', async() => { 
//         const cars = await genericController.delete('9999');
//         expect(cars).to.be.null;
//        })
//     })
//   })
// })