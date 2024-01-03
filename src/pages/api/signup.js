import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }

  // function to create user in our database
  async function createUserHandler(req, res) {
    let errors = [];
    const { email, password } = req.body;

    if (password.length < 6) {
      errors.push("password length should be more than 6 characters");
      return res.status(400).json({ errors });
    }
    
    try {
      const user = await prisma.user.create({
        data: { ...req.body, password: hashedPassword(req.body.password) },
      });
      return res.status(201).json({ user });
    } catch (e) {
      console.log(e);
      }
  }


    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, user: newUser });
}
