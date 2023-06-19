export type CustomerDomain = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
};

class Customer {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _phone: string;

  constructor({ id, name, email, password, phone }: CustomerDomain) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._phone = phone;
    this.validate();
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }

  get phone(): string {
    return this._phone;
  }

  validate() {
    if (this.id.length == 0) {
      throw new Error("Id is required");
    }
    if (this.name.length == 0) {
      throw new Error("Please insert a valid name");
    }
    if (this.email.length == 0) {
      throw new Error("Please insert a valid email");
    }
    if (this.password.length < 8) {
      throw new Error("Please insert a password with at least 8 characters");
    }
    if (this.phone.length != 9) {
      throw new Error("Please insert a valid phone number");
    }
  }

  changeEmail(email: string): void {
    this._email = email;
    this.validate();
  }

  changePassword(password: string): void {
    this._password = password;
    this.validate();
  }

  changePhone(phone: string): void {
    this._phone = phone;
    this.validate();
  }
}

export { Customer };
