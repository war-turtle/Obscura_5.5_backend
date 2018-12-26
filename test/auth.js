/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
// import server from '../server';
// import Player from '../app/models/player';

const should = chai.should();

// chai.use(chaiHttp);

describe('Auth Routes', () => {
  // beforeEach((done) => {
  //   Player.find({}, (err, user) => {
  //     console.log(user);
  //     done();
  //   });
  // });
  // after((done) => {
  //   server.close(() => {
  //     done();
  //   });
  // });

  // it('user first logging', (done) => {
  //   chai.request('server')
  //     .get('/auth/logout')
  //     .set('Content-Type', 'application/json')
  //     .end((err, res) => {
  //       console.log(err);
  //       console.log('response is ', res);
  //       done();
  //     });
  // });
  it('should pass', (done) => {
    'wow'.should.be.a('string');
    done();
  });
});
