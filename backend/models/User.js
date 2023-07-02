import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { bcryptService } from "../services/bcyrpt.service.js";

const hooks = {
  beforeSave(user) {
    if (user.changed('password')) {
      user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
    }
  },
};

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { hooks }
);

export default User;
