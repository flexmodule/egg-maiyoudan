'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class BussinessController extends Controller {
  async index() {
    const { ctx } = this;
    let offset = (toInt(ctx.query.page) - 1) * toInt(ctx.query.limit)
    let sqlquery = {};
    const Op = ctx.app.Sequelize.Op
    if (ctx.query.id) {
      sqlquery.id = ctx.query.id
    }
    if (ctx.query.merchantcode) {
      sqlquery.merchant_code = ctx.query.merchantcode
    }
    if (ctx.query.status) {
      sqlquery.status = ctx.query.status
    }
    if (ctx.query.type) {
      sqlquery.type = ctx.query.type
    }
    if (ctx.query.name) {
      sqlquery.name = {
        [Op.like]: `%${ctx.query.name}%`,
      }
    }
    if (ctx.query.activity_start) {
      sqlquery.activity_start = {
        [Op.gte]: new Date(ctx.query.activity_start),
      }
    }
    if (ctx.query.activity_end) {
      sqlquery.activity_end = {
        [Op.lte]: new Date(ctx.query.activity_end),
      }
    }
    
    const result = await ctx.model.Bussiness.findAndCountAll({
      where: sqlquery,
      offset: offset,
      limit: toInt(ctx.query.limit),
      include: [{
        association:ctx.model.Bussiness.belongsTo(ctx.model.Merchant,{foreignKey: 'merchant_code', targetKey: 'merchantcode'}),
      }],
    });
    let data = {
      code: 0,
      msg: result
    }
    ctx.body = data;
  }
  async addgoods() {
    const { ctx } = this;
    const { name, type, stock, salednum, sellingprice, spacialprice, cost, goodrate, status,
      detail, starttime, endtime, mainphoto, description, activity_start, activity_end, rules, merchant_code, limitnum } = ctx.request.body;
    const Bussiness = await ctx.model.Bussiness.create({
      name, type, stock, salednum, sellingprice, spacialprice, cost, goodrate, status,
      detail, starttime, endtime, mainphoto, description, activity_start, activity_end, rules, merchant_code, limitnum
    });
    let data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
  async modifygoods() {
    const { ctx } = this;
    const id = toInt(ctx.query.id);
    let data;
    const bussiness = await ctx.model.Bussiness.findByPk(id);
    if (!bussiness) {
      data = {
        code: 404,
        msg: '未找到记录'
      }
      ctx.body = data;
      return;
    }
    const { name, type, stock, salednum, sellingprice, spacialprice, cost, goodrate, status,
      detail, starttime, endtime, mainphoto, description, activity_start, activity_end, rules, merchant_code, limitnum } = ctx.request.body;
    const Bussiness = await bussiness.update({
      name, type, stock, salednum, sellingprice, spacialprice, cost, goodrate, status,
      detail, starttime, endtime, mainphoto, description, activity_start, activity_end, rules, merchant_code, limitnum
    });
    data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
  async modifygoodstatus() {
    const { ctx } = this;
    const id = toInt(ctx.query.id);
    let data;
    const bussiness = await ctx.model.Bussiness.findByPk(id);
    if (!bussiness) {
      data = {
        code: 404,
        msg: '未找到记录'
      }
      ctx.body = data;
      return;
    }
    const { status } = ctx.request.body;
    const Bussiness = await bussiness.update({ status });
    data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
  async deletegoods() {
    const { ctx } = this;
    const id = toInt(ctx.query.id);
    let data;
    const bussiness = await ctx.model.Bussiness.findByPk(id);
    if (!bussiness) {
      data = {
        code: 404,
        msg: '未找到记录'
      }
      ctx.body = data;
      return;
    }
    await bussiness.destroy();
    data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
}

module.exports = BussinessController;
