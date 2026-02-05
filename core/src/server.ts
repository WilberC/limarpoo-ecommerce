import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
import authRoutes from "./routes/auth.routes";
import v1Routes from "./routes/index";

app.use("/auth", authRoutes);
app.use("/api/v1", v1Routes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Checks the health of the service and database connection
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 service:
 *                   type: string
 *                   example: core-backend
 *                 database:
 *                   type: string
 *                   example: connected
 *       503:
 *         description: Service unavailable or database disconnected
 */
// Health Check
app.get("/health", async (req: Request, res: Response) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      service: "core-backend",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(503).json({
      status: "error",
      service: "core-backend",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: "Database unavailable",
    });
  }
});

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Limarpoo Core API" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
