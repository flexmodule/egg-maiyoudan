'use strict';
module.exports = app => {
  const { BIGINT, INTEGER, DECIMAL, STRING, TEXT, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    usercode: {
      type: STRING,
      allowNull: true,
    },
    ismerchant: {
      type: INTEGER,
      allowNull: true,
    },
    isretail: {
      type: INTEGER,
      allowNull: true,
    },
    nikename: {
      type: STRING,
      allowNull: true,
    },
    avatarurl: {
      type: STRING,
      allowNull: true,
    },
    open_id: {
      type: STRING,
      allowNull: true,
    },
    mobile: {
      type: STRING,
      allowNull: true,
    },
    province: {
      type: STRING,
      allowNull: true,
    },
    city: {
      type: STRING,
      allowNull: true,
    },
    sex: {
      type: INTEGER,
      allowNull: true,
    },
    real_name: {
      type: STRING,
      allowNull: true,
    },
    merchantcode: {
      type: STRING,
      allowNull: true,
    },
    retailcode: {
      type: STRING,
      allowNull: true,
    }
  }, {
      underscored: true,
      freezeTableName: true,
      tableName: 'user',
      timestamps: true,
    });
  return User;
};
