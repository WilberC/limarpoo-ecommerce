import { Request, Response } from "express";
import { CustomerProfileService } from "../services/customer-profile.service";

const customerProfileService = new CustomerProfileService();

export class CustomerProfileController {
  async getAllProfiles(req: Request, res: Response) {
    try {
      const profiles = await customerProfileService.getAllProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProfileById(req: Request, res: Response) {
    try {
      const profile = await customerProfileService.getProfileById(
        req.params.id as string,
      );
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProfileByUserId(req: Request, res: Response) {
    try {
      const profile = await customerProfileService.getProfileByUserId(
        req.params.userId as string,
      );
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createProfile(req: Request, res: Response) {
    try {
      const profile = await customerProfileService.createProfile(req.body);
      res.status(201).json(profile);
    } catch (error: any) {
      if (error.code === "P2002") {
        res.status(409).json({ error: "Profile for this user already exists" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const profile = await customerProfileService.updateProfile(
        req.params.id as string,
        req.body,
      );
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteProfile(req: Request, res: Response) {
    try {
      await customerProfileService.deleteProfile(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
