import { Sequelize, DataTypes } from "sequelize";
import Tally from "./tally";
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ["firstName", "lastName"]),
      get: () => {
        return `${this.firstName} ${this.lastName}`;
      },
      set: (_value) => {
        throw new Error("User.fullName is a read-only attribute");
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    indexes: [],
  }
);

User.hasMany(Tally);

export default User;
