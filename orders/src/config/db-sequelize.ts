import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "ms_orders",
  dialect: "postgres",
});
