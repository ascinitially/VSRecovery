module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  });

  User.associate = function (models) {
    User.hasMany(models.Deal, {
      ondDelete: "cascade"
    });
  };

  return User;
};