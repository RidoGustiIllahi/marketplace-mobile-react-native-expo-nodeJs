const express = require("express");
const router = express.Router();
const { user } = require("../models");

/**
 * =========================
 * GET USER BY ID
 * =========================
 */
router.get("/:id", async (req, res) => {
    try {
        const data = await user.findByPk(req.params.id, {
            attributes: { exclude: ["password"] }
        });

        if (!data) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * =========================
 * REGISTER
 * =========================
 */
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Data tidak lengkap" });
        }

        const existingUser = await user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email sudah terdaftar" });
        }

        const newUser = await user.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            message: "Register berhasil",
            data: {
                id_user: newUser.id_user,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * =========================
 * LOGIN
 * =========================
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password wajib diisi" });
        }

        const data = await user.findOne({ where: { email } });
        if (!data) {
            return res.status(401).json({ message: "Email tidak terdaftar" });
        }

        if (password !== data.password) {
            return res.status(401).json({ message: "Password salah" });
        }

        res.json({
            message: "Login berhasil",
            user: {
                id_user: data.id_user,
                name: data.name,
                email: data.email,
                role: data.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * =========================
 * DELETE USER
 * =========================
 */
router.delete("/:id", async (req, res) => {
    try {
        const data = await user.findByPk(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await data.destroy();
        res.json({ message: "User berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;