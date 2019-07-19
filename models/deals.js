module.exports = function (sequelize, DataTypes) {

  var Deal = sequelize.define("Deal", {
    offered: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    offeredQTY: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    offeredUnits: {
      type: DataTypes.STRING,
      allowNull: false
    },
    asked: {
      type: DataTypes.STRING,
      allowNull: false
    },
    askedQTY: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    askedUnits: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('open', 'pending', 'closed'),
      allowNull: false
    },
  });

  Deal.associate = function (models) {
    Deal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Deal;
};