module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('penjual', 'pembeli'),
            allowNull: false
        },
        address: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'users'
    });

    User.associate = (models) => {
        User.hasMany(models.product, {
            foreignKey: 'id_user',
            as: 'products'
        });
        
        User.hasMany(models.order, {
            foreignKey: 'id_user',
            as: 'orders'
        });
    };

    return User;
};
