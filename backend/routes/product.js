const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { product: Product } = require("../models");

/**
 * CREATE PRODUCT + FOTO
 */
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            stock_quantity,
            weight,
            id_user
        } = req.body;

        const image = req.file
            ? `uploads/products/${req.file.filename}`
            : null;

        const product = await Product.create({
            name,
            description,
            price,
            stock_quantity,
            weight,
            image,
            id_user
        });

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * GET PRODUCT BY USER (PENJUAL)
 * ⚠️ HARUS DI ATAS /:id
 */
router.get("/user/:id_user", async (req, res) => {
    try {
        const { id_user } = req.params;

        const products = await Product.findAll({
            where: { id_user },
            include: ["user"]
        });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * GET ALL PRODUCT
 */
router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll({
            include: ["user"]
        });
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * UPDATE PRODUCT (+ GANTI FOTO OPSIONAL)
 */
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const id = req.params.id;

        const data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock_quantity: req.body.stock_quantity,
            weight: req.body.weight,
        };

        if (req.file) {
            data.image = `uploads/products/${req.file.filename}`;
        }

        const updated = await Product.update(data, {
            where: { id_product: id }
        });

        if (updated[0] === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * DELETE PRODUCT
 */
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Product.destroy({
            where: { id_product: id }
        });

        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
