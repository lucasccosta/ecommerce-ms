import { Customer } from "./Customer";
import { v4 as uuid } from "uuid";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer({
        id: "",
        name: "Test",
        email: "test@test.com",
        password: "123456789",
        phone: "946235210"
      });
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer({
        id: uuid(),
        name: "",
        email: "test@test.com",
        password: "123456789",
        phone: "946235210"
      });
      }).toThrowError("Please insert a valid name");
  });

  it("should throw error when email is empty", () => {
    expect(() => {
      let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: "",
        password: "123456789",
        phone: "946235210"
      });
      }).toThrowError("Please insert a valid email");
  });

  it("should throw error when password does not have at least 8 characters", () => {
    expect(() => {
      let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: "test@test.com",
        password: "123456",
        phone: "946235210"
      });
      }).toThrowError("Please insert a password with at least 8 characters");
  });

  it("should throw error when phone number does not have exactly 9 characters", () => {
    expect(() => {
      let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: "test@test.com",
        password: "123456789",
        phone: "9856587"
      });
      }).toThrowError("Please insert a valid phone number");
  });

  it("should change email", () => {
    let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: "test@test.com",
        password: "123456789",
        phone: "985632541"
      });  
      customer.changeEmail("test2@test.com");

    expect(customer.email).toBe("test2@test.com")

  });

  it("should throw error when trying to email but passes an invalid email", () => {
    expect(() => {
      let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: "test@test.com",
        password: "123456789",
        phone: "985632541"
        
      })
      customer.changeEmail("")
    }).toThrowError("Please insert a valid email");
  });

  it("should change password", () => {
    let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: "test@test.com",
        password: "123456789",
        phone: "985632541"
      });  
      customer.changePassword("alsoed!234");

    expect(customer.password).toBe("alsoed!234")

  });

  it("should throw error when trying to email but passes an invalid email", () => {
    expect(() => {
      let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: "test@test.com",
        password: "123456789",
        phone: "985632541"
        
      })
      customer.changePassword("$ffg5")
    }).toThrowError("Please insert a password with at least 8 characters");
  });

  it("should change phone number", () => {
    let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: "test@test.com",
        password: "123456789",
        phone: "985632541"
      });  
      customer.changePhone("988556982");

    expect(customer.phone).toBe("988556982")

  });

  it("should throw error when trying to email but passes an invalid email", () => {
    expect(() => {
      let customer = new Customer({
        id: uuid(),
        name: "Test",
        email: "test@test.com",
        password: "123456789",
        phone: "985632541"
        
      })
      customer.changePhone("998523")
    }).toThrowError("Please insert a valid phone number");
  });

});
