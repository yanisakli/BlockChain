import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

export default sequelize
