import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      if (error.message === "User already exists") {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { user, token } = await authService.login(req.body);
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      if (error.message === "Invalid credentials") {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async logout(req: Request, res: Response) {
    // Since we are using JWTs, server-side logout is stateless.
    // Client should discard the token.
    res.json({ message: "Logout successful" });
  }
}
