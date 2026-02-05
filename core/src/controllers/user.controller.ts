import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      // Remove password hash from response
      const sanitizedUsers = users.map((user) => {
        const { password_hash, ...rest } = user;
        return rest;
      });
      res.json(sanitizedUsers);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userService.getUserById(req.params.id as string);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password_hash, ...rest } = user;
      res.json(rest);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      const { password_hash, ...rest } = user;
      res.status(201).json(rest);
    } catch (error: any) {
      if (error.code === "P2002") {
        res.status(409).json({ error: "User with this email already exists" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(
        req.params.id as string,
        req.body,
      );
      const { password_hash, ...rest } = user;
      res.json(rest);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await userService.deleteUser(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
