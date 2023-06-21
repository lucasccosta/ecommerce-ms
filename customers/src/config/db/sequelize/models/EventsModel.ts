import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../../../db-sequelize";

class EventsModel extends Model {}

EventsModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      
    },
    eventData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    tableName: "events",
    timestamps: false,
    sequelize,
  }
);

export { EventsModel };
