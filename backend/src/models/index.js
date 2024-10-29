const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.messages = require('./message.model.js')(sequelize, Sequelize);

db.users.hasMany(db.messages, { as: 'sentMessages', foreignKey: 'senderId' });
db.messages.belongsTo(db.users, { as: 'sender', foreignKey: 'senderId' });

module.exports = db;