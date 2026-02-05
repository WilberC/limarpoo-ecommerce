import { Request, Response } from "express";
import { AddressService } from "../services/address.service";

const addressService = new AddressService();

export class AddressController {
  async getAllAddresses(req: Request, res: Response) {
    try {
      const addresses = await addressService.getAllAddresses();
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAddressById(req: Request, res: Response) {
    try {
      const address = await addressService.getAddressById(
        req.params.id as string,
      );
      if (!address) {
        return res.status(404).json({ error: "Address not found" });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createAddress(req: Request, res: Response) {
    try {
      const address = await addressService.createAddress(req.body);
      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateAddress(req: Request, res: Response) {
    try {
      const address = await addressService.updateAddress(
        req.params.id as string,
        req.body,
      );
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteAddress(req: Request, res: Response) {
    try {
      await addressService.deleteAddress(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserAddresses(req: Request, res: Response) {
    try {
      const addresses = await addressService.getUserAddresses(
        req.params.userId as string,
      );
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
