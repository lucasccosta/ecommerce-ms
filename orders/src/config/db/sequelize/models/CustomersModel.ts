import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../db-sequelize"; 
import { v4 as uuid} from "uuid"

class CustomersModel extends Model {}

CustomersModel.init(
  {
    id: {
      defaultValue: uuid(),
      type: DataTypes.STRING,
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
