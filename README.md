# Ecommerce microservice

## Description

- I designed and built a simple microservice architecture consists of three services, Customers Service, Orders Service and Products Service. The separation of them was following a need to mantain speciallized services, but even so they have modules to separate different types of responsibilities.
- There are two main types of communication Synchronous and Asynchronous:

    . Synchronous communication: When a service needs to communicate with another, and the response must be as fast as it can be, a synchronous communication happens between those services, a HTTP call is made using the library @axios.

    . Asynchronous communication: When a service just whants to inform that an action was made, and it does not need to be responded but informed if some other service is interested in this communication, it is made a asynchronous communication using an **event** to a **specified** topic in Apache Kafka, so **consumers** of this topic can received this event and do some action from that.

![image](https://github.com/lucasccosta/ecommerce-ms/assets/25307283/9e313b13-3b2a-42e9-a612-b2ce725e4bce)


  The code design was following Clean Architecure. Different layers were created, and all of them having a single and exclusive responsibility, as suggested by the SOLID pattern, and separated the business rules from the application rules, with each layer responsible for solving only the proposed problem. The layers were:

- Controller: Layer responsible for receiving http calls and returning the response to the user, both positive and returning error cases if they occur.

- Use Case:
Responsible for orchestrating the actions of that route. For example, a create user use case will capture the actions of checking whether that user already exists in the database, if it exists, it will return an error message to the user, and if it does not exist, ask the responsible service to communicate with the bank. of data to actually create this user.

- Repository: Layer responsible for communicating with the database

- Domain: layer responsible for dealing with the business rule.
