import { CustomError } from "../../infra/CustomError";

export type ProductDomain = {
  id?: string;
  name: string;
  code: string;
  quantity: number;
  price: number;
};

class Product {
  private _id: string;
  private _name: string;
  private _code: string;
  private _quantity: number;
  private _price: number;

  constructor({ id, name, code, quantity, price }: ProductDomain) {
    this._id = id;
    this._name = name;
    this._code = code;
    this._quantity = quantity;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }
  get quantity(): number {
    return this._quantity;
  }
  get price(): number {
    return this._price;
  }

  checkAvailability(quantity: number) {
    if (this.quantity < quantity) return;
    return "Available";
  }

  validate() {
    if (this.name.length == 0) {
      throw new CustomError("Please insert a valid name", 422);
    }
    if (this.code.length == 0) {
      throw new CustomError("Please insert a valid code", 422);
    }
    if (this.quantity < 0) {
      throw new CustomError("Quantity must be greater than 0", 422);
    }
    if (this.price < 0) {
      throw new CustomError("Price must be greater than 0", 422);
    }
  }
}

export { Product };
