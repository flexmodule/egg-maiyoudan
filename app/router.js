'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.user.index);
  router.get('/data', controller.data.index);
  router.get('/maiyoudan/bussiness', controller.bussiness.index);
  router.post('/maiyoudan/addgoods', controller.bussiness.addgoods);
  router.post('/maiyoudan/modifygoods', controller.bussiness.modifygoods);
  router.post('/maiyoudan/deletegoods', controller.bussiness.deletegoods);
  router.post('/maiyoudan/modifygoodstatus', controller.bussiness.modifygoodstatus);
  router.get('/maiyoudan/merchant', controller.merchant.index);
  router.post('/maiyoudan/addmerchant', controller.merchant.addmerchant);
  router.post('/maiyoudan/modifymerchant', controller.merchant.modifymerchant);
  router.post('/maiyoudan/deletemerchant', controller.merchant.deletemerchant);
  router.post('/maiyoudan/modifymerchantstatus', controller.merchant.modifymerchantstatus);
  router.get('/maiyoudan/user', controller.user.index);
  router.post('/maiyoudan/deleteuser', controller.user.deleteuser);
  router.post('/maiyoudan/modifyismerchant', controller.user.modifyismerchant);
  router.post('/maiyoudan/modifyisretail', controller.user.modifyisretail);
  router.post('/maiyoudan/getimg', controller.getimg.index);
};
