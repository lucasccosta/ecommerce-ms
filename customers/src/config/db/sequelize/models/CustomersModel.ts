import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../../config/db-sequelize";

class CustomersModel extends Model {}

CustomersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "customers",
    timestamps: false,
    sequelize,
  }
);

export { CustomersModel };
