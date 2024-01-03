// Import necessary modules
import { PrismaClient } from "@prisma/client"; // Prisma Client for database operations
import bcrypt from "bcryptjs"; // bcryptjs for password hashing
import jwt from "jsonwebtoken"; // jsonwebtoken for generating JWT tokens

// Instantiate Prisma Client
const prisma = new PrismaClient();

// Export default async function as the handler for this API route
export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === "POST") {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Find a user in the database with the provided email
    const user = await prisma.user.findUnique({ where: { email } });
    // If no user is found, return a 400 status code and a JSON response
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found with this email." });
    }

    // Compare the provided password with the hashed password in the database
    const valid = await bcrypt.compare(password, user.password);
    // If the password is incorrect, return a 400 status code and a JSON response
    if (!valid) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // If the password is correct, sign a new JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return a 200 status code and a JSON response with the token and the user data
    return res.status(200).json({ token, user });
  }

  // If the request method is not POST, return a 405 status code and a JSON response
  return res.status(405).json({ message: "Method not allowed." });
}
