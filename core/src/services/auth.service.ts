import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // TODO: Move to .env

export class AuthService {
  async register(data: any): Promise<User> {
    const { email, password, firstName, lastName } = data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user and profile transactionally
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password_hash: passwordHash,
        },
      });

      if (firstName && lastName) {
        await tx.customerProfile.create({
          data: {
            user_id: newUser.id,
            first_name: firstName,
            last_name: lastName,
          },
        });
      }

      return newUser;
    });

    return user;
  }

  async login(data: any): Promise<{ user: User; token: string }> {
    const { email, password } = data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Generate token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return { user, token };
  }
}
