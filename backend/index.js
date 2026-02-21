import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.ts";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// CORS : autorise l'origine configuree en production, ou toutes les origines en dev
app.use(
  cors(
    process.env.CORS_ORIGIN
      ? { origin: process.env.CORS_ORIGIN, credentials: true }
      : undefined
  )
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ToDo API is running");
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Nom, email et mot de passe requis" });
    }

    // Vérifier si l'utilisateur existe déjà dans la DB
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur dans PostgreSQL
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    // Récupérer l'utilisateur depuis PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ===== ENDPOINTS TODOS =====

// GET - Lister les todos d'un utilisateur
app.get("/api/todos/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { id: "asc" },
    });

    res.json(todos);
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST - Créer un todo
app.post("/api/todos", async (req, res) => {
  try {
    const { title, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ message: "Title et userId requis" });
    }

    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        userId,
      },
    });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Create todo error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// PUT - Modifier un todo
app.put("/api/todos/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, completed } = req.body;

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        ...(title && { title }),
        ...(completed !== undefined && { completed }),
      },
    });

    res.json(updatedTodo);
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// DELETE - Supprimer un todo
app.delete("/api/todos/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;

    await prisma.todo.delete({
      where: { id: todoId },
    });

    res.json({ message: "Todo supprimé" });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
