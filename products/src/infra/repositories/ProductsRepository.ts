import { ProductsModel } from "../../config/db/sequelize/models/ProductsModel";
import { Product } from "../../modules/domain/Products";
import { IProductsRepository } from "./IProductsRepository";

export class ProductsRepository implements IProductsRepository {
  private ProductsModel = ProductsModel;

  async createProducts({
    name,
    code,
    quantity,
    price,
  }): Promise<ProductsModel> {
    return await this.ProductsModel.create({ name, code, quantity, price });
  }

  async getProductByCode(code: string): Promise<Product> {
    const product = await this.ProductsModel.findOne({ where: { code } });
    if (product)
      return new Product({
        id: product.dataValues.id,
        name: product.dataValues.name,
        code: product.dataValues.code,
        quantity: product.dataValues.quantity,
        price: product.dataValues.price,
      });
    return;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.ProductsModel.findOne({ where: { id } });
    if (product)
      return new Product({
        id: product.dataValues.id,
        name: product.dataValues.name,
        code: product.dataValues.code,
        quantity: product.dataValues.quantity,
        price: product.dataValues.price,
      });
    return;
  }
}
