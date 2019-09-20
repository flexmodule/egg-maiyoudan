'use strict';
module.exports = app => {
  const { BIGINT, INTEGER, DECIMAL, STRING, TEXT, DATE } = app.Sequelize;
  const Merchant = app.model.define('merchant', {
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
    busshours: {
      type: STRING,
      allowNull: true,
    },
    tel: {
      type: STRING,
      allowNull: true,
    },
    address: {
      type: STRING,
      allowNull: true,
    },
    mall: {
      type: STRING,
      allowNull: true,
    },
    pcd: {
      type: STRING,
      allowNull: true,
    },
    latitude: {
      type: DECIMAL,
      allowNull: true,
    },
    longitude: {
      type: DECIMAL,
      allowNull: true,
    },
    status: {
      type: INTEGER,
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
    master: {
      type: STRING,
      allowNull: true,
    },
    merchantcode: {
      type: STRING,
      allowNull: true,
    }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: 'merchant',
      timestamps: true,
    });
  return Merchant;
};
