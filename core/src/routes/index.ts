import { Router } from "express";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import userRoutes from "./user.routes";
import orderRoutes from "./order.routes";
import addressRoutes from "./address.routes";
import articleRoutes from "./article.routes";
import reviewRoutes from "./review.routes";
import customerProfileRoutes from "./customer-profile.routes";
import orderItemRoutes from "./order-item.routes";
import paymentRoutes from "./payment.routes";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/addresses", addressRoutes);
router.use("/articles", articleRoutes);
router.use("/reviews", reviewRoutes);
router.use("/customer-profiles", customerProfileRoutes);
router.use("/order-items", orderItemRoutes);
router.use("/payments", paymentRoutes);

export default router;
