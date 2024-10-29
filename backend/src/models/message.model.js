module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    room: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'public'
    },
    receiverId: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });

  return Message;
};