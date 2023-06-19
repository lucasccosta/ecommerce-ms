import { uuid as v4 } from "uuid"

import {
  Table,
  Column,
  PrimaryKey,
  Model,
  Default,
} from "sequelize-typescript";


@Table({
  tableName: "customers",
  timestamps: false,
})
class CustomersModel extends Model {
  @PrimaryKey
  @Default(v4)
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  @Column({unique: true})
  declare externalId: string;

  @Column({ allowNull: false })
  @Column({unique: true})
  declare email: string;

}

export { CustomersModel };