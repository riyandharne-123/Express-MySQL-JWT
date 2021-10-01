
module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define("roles", {
        name : { 
            type: DataTypes.STRING ,
            allowNull: false,
        },
    });
}
