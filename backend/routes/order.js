const express = require("express");
const router = express.Router();
const { order: Order, product: Product, user: User } = require("../models");

/**
 * =========================
 * CREATE ORDER
 * =========================
 */
router.post("/", async (req, res) => {
    try {
        const {
            id_user,
            id_product,
            quantity,
            shipping_price
        } = req.body;

        const product = await Product.findByPk(id_product);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (quantity > product.stock_quantity) {
            return res.status(400).json({ message: "Stock not sufficient" });
        }

        const price = product.price;
        const total_price = (price * quantity) + Number(shipping_price);

        const order = await Order.create({
            id_user,
            id_product,
            quantity,
            price,
            shipping_price,
            total_price,
            status: "ordered"
        });

        // Kurangi stok produk
        await product.update({
            stock_quantity: product.stock_quantity - quantity
        });

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * =========================
 * GET ORDER BY USER (PEMBELI)
 * =========================
 */
router.get("/user/:id_user", async (req, res) => {
    try {
        const { id_user } = req.params;

        const orders = await Order.findAll({
            where: { id_user },
            include: [
                { model: Product, as: "product" },
                { model: User, as: "user" }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * =========================
 * GET ORDER BY SELLER (PENJUAL)
 * =========================
 */
router.get("/seller/:id_user", async (req, res) => {
    try {
        const { id_user } = req.params;

        const orders = await Order.findAll({
            include: [
                {
                    model: Product,
                    as: "product",
                    where: { id_user }
                },
                {
                    model: User,
                    as: "user"
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * =========================
 * GET ALL ORDER (ADMIN)
 * =========================
 */
router.get("/", async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: Product, as: "product" },
                { model: User, as: "user" }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * =========================
 * UPDATE STATUS ORDER
 * =========================
 */
router.put("/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatus = ["ordered", "shipped", "completed", "cancelled"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updated = await Order.update(
            { status },
            { where: { id_order: id } }
        );

        if (updated[0] === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order status updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * =========================
 * DELETE ORDER
 * =========================
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Order.destroy({
            where: { id_order: id }
        });

        if (!deleted) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
