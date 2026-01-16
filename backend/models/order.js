module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define('order', {
        id_order: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        },

        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id_product'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },

        price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        },

        shipping_price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        },

        total_price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM('ordered', 'shipped', 'completed', 'cancelled'),
            defaultValue: 'ordered'
        }

    }, {
        tableName: 'orders',
        timestamps: true
    });

    Order.associate = (models) => {
        Order.belongsTo(models.user, {
            foreignKey: 'id_user',
            as: 'user'
        });

        Order.belongsTo(models.product, {
            foreignKey: 'id_product',
            as: 'product'
        });
    };

    return Order;
};
