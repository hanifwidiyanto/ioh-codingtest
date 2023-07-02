import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Invoice = sequelize.define("Invoice", {
  invoice_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoice_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Invoice.belongsTo(User, { foreignKey: "user_id" });

export default Invoice;
