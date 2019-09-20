'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await ctx.model.Bussiness.findAll();
            console.log(result);
    ctx.body = result;
  }
}

module.exports = HomeController;
