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
    // this.validate();
  }

  // get id(): string {
  //   return this._id;
  // }
  // get username(): string {
  //   return this._username;
  // }

  // get email(): string {
  //   return this._email;
  // }
  // get password(): string {
  //   return this._password;
  // }

  // validate() {
  //   if (this.username.length == 0) {
  //     throw unprocessableEntityError("Please insert a valid username");
  //   }
  //   if (this.email.length == 0) {
  //     throw unprocessableEntityError("Please insert a valid email");
  //   }
  //   if (this.password.length < 8) {
  //     throw unprocessableEntityError(
  //       "Please insert a password with at least 8 characters"
  //     );
  //   }
  // }

  // changeEmail(email: string): void {
  //   this._email = email;
  //   this.validate();
  // }

  // changePassword(password: string): void {
  //   this._password = password;
  //   this.validate();
  // }
}

export { Customer };
