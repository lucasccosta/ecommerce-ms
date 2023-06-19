import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../db-sequelize"; 

class ProductsModel extends Model {}

ProductsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quantity: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    tableName: "products",
    timestamps: false,
    sequelize,
  }
);

export { ProductsModel };
