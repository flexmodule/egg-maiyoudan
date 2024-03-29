'use strict';

const Controller = require('egg').Controller;
const uuid=require('node-uuid');
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class UserController extends Controller {
  async index() {
    const { ctx } = this;
    let offset = (toInt(ctx.query.page) - 1) * toInt(ctx.query.limit)
    let sqlquery = {};
    const Op = ctx.app.Sequelize.Op;
    if (ctx.query.id) {
      sqlquery.id = ctx.query.id
    }
    if (ctx.query.merchantcode) {
      sqlquery.merchantcode = ctx.query.merchantcode
    }
    if (ctx.query.retailcode) {
      sqlquery.retailcode = ctx.query.retailcode
    }
    if (ctx.query.usercode) {
      sqlquery.usercode = ctx.query.usercode
    }
    if (ctx.query.sex) {
      sqlquery.sex = ctx.query.sex
    }
    if (ctx.query.nikeName) {
      sqlquery.nikename = {
        [Op.like]: `%${ctx.query.nikeName}%`,
      }
    }
    if (ctx.query.province) {
      sqlquery.province = {
        [Op.like]: `%${ctx.query.province}%`,
      }
    }
    if (ctx.query.city) {
      sqlquery.city = {
        [Op.like]: `%${ctx.query.city}%`,
      }
    }
    const result = await ctx.model.User.findAndCountAll({
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
  async userauth() {
    const { ctx } = this;
    const { name,description,type,status,mainphoto,tel,master,busshours,pcd,address,mall,longitude,latitude } = ctx.request.body;
    let merchantcode=uuid.v1();
    const Merchant = await ctx.model.User.create({ name,description,type,status,mainphoto,tel,master,busshours,pcd,address,mall,longitude,latitude,merchantcode });
    let data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
  async modifyismerchant() {
    const { ctx } = this;
    const id = toInt(ctx.query.id);
    let data;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      data = {
        code: 404,
        msg: '未找到记录'
      }
      ctx.body = data;
      return;
    }
    const { ismerchant,merchantcode } = ctx.request.body;
    const User = await user.update({ ismerchant,merchantcode });
    data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
  async modifyisretail() {
    const { ctx } = this;
    const id = toInt(ctx.query.id);
    let data;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      data = {
        code: 404,
        msg: '未找到记录'
      }
      ctx.body = data;
      return;
    }
    const { isretail,retailcode } = ctx.request.body;
    const User = await user.update({ isretail,retailcode });
    data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
  async deleteuser() {
    const { ctx } = this;
    const id = toInt(ctx.query.id);
    let data;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      data = {
        code: 404,
        msg: '未找到记录'
      }
      ctx.body = data;
      return;
    }
    await user.destroy();
    data = {
      code: 0,
      msg: '操作成功'
    }
    ctx.body = data;
  }
}

module.exports = UserController;
