export interface ICreateCustomer {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface ICreateCustomerRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}
