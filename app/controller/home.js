'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg我是宇宙无敌大帅哥';
  }
}

module.exports = HomeController;
