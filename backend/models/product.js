module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('product', {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: false
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id_user'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }, {
        tableName: 'products'
    });

    Product.associate = (models) => {
        Product.belongsTo(models.user, {
            foreignKey: 'id_user',
            as: 'user'
        });
        
        Product.hasMany(models.order, {
            foreignKey: 'id_product',
            as: 'orders'
        });
    };

    return Product;
};
