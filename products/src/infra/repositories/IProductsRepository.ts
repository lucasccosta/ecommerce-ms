import { ProductsModel } from "../../config/db/sequelize/models/ProductsModel";
import { Product } from "../../modules/domain/Products";

export interface IProductsRepository {
  createProducts({ name, code, quantity, price }): Promise<ProductsModel>;
  getProductByCode(code: string): Promise<Product>;
  getProductById(id: string): Promise<Product>;
}
