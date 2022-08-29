module.exports = (sequelize, DataTypes) => {

    const Car = sequelize.define("car", {
        mark: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        launchDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        mileage: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })

    return Car

}