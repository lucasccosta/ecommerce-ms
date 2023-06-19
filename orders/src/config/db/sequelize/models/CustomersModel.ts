import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../db-sequelize"; 

class CustomersModel extends Model {}

CustomersModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "customers",
    timestamps: false,
    sequelize,
  }
);

export { CustomersModel };
