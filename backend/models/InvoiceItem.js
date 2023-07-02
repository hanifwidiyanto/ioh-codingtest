import { DataTypes } from 'sequelize';
import sequelize from "../config/database.js";
import Invoice from './Invoice.js';
import Item from './Item.js';

const InvoiceItem = sequelize.define('InvoiceItem', {
  invoice_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity_item: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

InvoiceItem.belongsTo(Invoice, { foreignKey: 'invoice_id' });
Invoice.hasMany(InvoiceItem, { foreignKey: 'invoice_id' });

InvoiceItem.belongsTo(Item, { foreignKey: 'item_id' });
Item.hasMany(InvoiceItem, { foreignKey: 'item_id' });

export default InvoiceItem;
