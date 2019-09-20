'use strict';
module.exports = app => {
  const { BIGINT,INTEGER, DECIMAL,STRING,TEXT,DATE} = app.Sequelize;
  const Bussiness = app.model.define('bussiness', {
    id: {
      type: BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: true,
    },
    type: {
      type: INTEGER,
      allowNull: true,
    },
    stock: {
        type: INTEGER,
        allowNull: true,
      },
      salednum: {
        type: INTEGER,
        allowNull: true,
      },
      sellingprice: {
        type: DECIMAL,
        allowNull: true,
      },
      spacialprice: {
        type: DECIMAL,
        allowNull: true,
      },
      cost: {
        type: DECIMAL,
        allowNull: true,
      },
      goodrate: {
        type: DECIMAL,
        allowNull: true,
      },
      status: {
        type: INTEGER,
        allowNull: true,
      },
      activity_start: {
        type: DATE,
        allowNull: true,
      },
      activity_end: {
        type: DATE,
        allowNull: true,
      },
      detail: {
        type: TEXT,
        allowNull: true,
      },
      starttime: {
        type: DATE,
        allowNull: true,
      },
      endtime: {
        type: DATE,
        allowNull: true,
      },
      mainphoto: {
        type: TEXT,
        allowNull: true,
      },
      description: {
        type: STRING,
        allowNull: true,
      },
      rules: {
        type: STRING,
        allowNull: true,
      },
      merchant_code:{
        type: STRING,
        allowNull: true,
      },
      limitnum:{
        type: INTEGER,
        allowNull: true,
      }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'bussiness',
    timestamps: true,
  });
  return Bussiness;
};
