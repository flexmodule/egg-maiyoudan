'use strict';

const Controller = require('egg').Controller;

class DataController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, data';
  }
}

module.exports = DataController;
