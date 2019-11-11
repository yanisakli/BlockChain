import User from '../model/User'
import { DataTypes } from 'sequelize'
import Database from '../Database'

export default function() {
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  }, {
    sequelize: Database,
    tableName: 'Users',
  });
}
