import { ProductsModel } from "../../config/db/sequelize/models/ProductsModel";


export interface IProductsRepository {
  createProducts({name, code, quantity, price}): Promise<ProductsModel>
  getProductByCode(code: string): Promise<ProductsModel>
}
