import { container } from "tsyringe";
import "./create-client/CreateClientConsumer";
import "./create-product/CreateProductConsumer";
import { CustomerConsumer } from "./create-client/CreateClientConsumer";
import { ProductConsumer } from "./create-product/CreateProductConsumer";

const customerConsumer = container.resolve(CustomerConsumer);
const productConsumer = container.resolve(ProductConsumer);

customerConsumer.createCustomerConsumer();
productConsumer.createProductConsumer();
