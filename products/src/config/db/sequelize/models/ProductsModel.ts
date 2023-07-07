import { Model, DataTypes, UUID } from "sequelize";
import { sequelize } from "../../../db-sequelize";
import { v4 as uuid } from "uuid";

class ProductsModel extends Model {}

ProductsModel.init(
  {
    id: {
      defaultValue: uuid(),
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
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
