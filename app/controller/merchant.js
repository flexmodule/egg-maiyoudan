'use strict';

const Controller = require('egg').Controller;
const uuid=require('node-uuid');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class MerchantController extends Controller {
  async index() {
    const { ctx } = this;
    let offset = (toInt(ctx.query.page) - 1) * toInt(ctx.query.limit)
    let sqlquery = {};
    const Op = ctx.app.Sequelize.Op
    if (ctx.query.id) {
      sqlquery.id = ctx.query.id
    }
    if (ctx.query.merchantcode) {
      sqlquery.merchantcode = ctx.query.merchantcode
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
    if (ctx.query.pcd) {
      sqlquery.pcd = {
        [Op.like]: `%${ctx.query.pcd}%`,
      }
    }
    if (ctx.query.master) {
      sqlquery.master = {
        [Op.like]: `%${ctx.query.master}%`,
      }
    }
    if (ctx.query.mall) {
      sqlquery.mall = {
        [Op.like]: `%${ctx.query.mall}%`,
      }
    }
    const result = await ctx.model.Merchant.findAndCountAll({
      where: sqlquery,
      offset: offset,
      limit: toInt(ctx.query.limit)
    });
    let data = {
      code: 0,
      msg: result
    }
    ctx.body = data;
  }
  async addmerchant() {
    const { ctx } = this;
    const { name,description,type,status,mainphoto,tel,master,busshours,pcd,address,mall,longitude,latitude } = ctx.request.body;
    let merchantcode=uuid.v1();
    const Merchant = await ctx.model.Merchant.create({ name,description,type,status,mainphoto,tel,master,busshours,pcd,address,mall,longitude,latitude,merchantcode });
    let data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
  async modifymerchant() {
    const { ctx } = this;
    const id = toInt(ctx.query.id);
    let data;
    const merchant = await ctx.model.Merchant.findByPk(id);
    if (!merchant) {
      data = {
        code: 404,
        msg: '未找到记录'
      }
      ctx.body = data;
      return;
    }
    const { name,description,type,status,mainphoto,tel,master,busshours,pcd,address,mall,longitude,latitude } = ctx.request.body;
    const Merchant = await merchant.update({name,description,type,status,mainphoto,tel,master,busshours,pcd,address,mall,longitude,latitude});
    data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
  async modifymerchantstatus() {
    const { ctx } = this;
    const id = toInt(ctx.query.id);
    let data;
    const merchant = await ctx.model.Merchant.findByPk(id);
    if (!merchant) {
      data = {
        code: 404,
        msg: '未找到记录'
      }
      ctx.body = data;
      return;
    }
    const { status } = ctx.request.body;
    const Merchant = await merchant.update({ status });
    data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
  async deletemerchant() {
    const { ctx } = this;
    const id = toInt(ctx.query.id);
    let data;
    const merchant = await ctx.model.Merchant.findByPk(id);
    if (!merchant) {
      data = {
        code: 404,
        msg: '未找到记录'
      }
      ctx.body = data;
      return;
    }
    await merchant.destroy();
    data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
}

module.exports = MerchantController;
