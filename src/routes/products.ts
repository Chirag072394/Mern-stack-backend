import express from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//route - create new product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);
//route- get latest products - /api/v1/product/latest
app.get("/latest", getLatestProducts);

app.get("/categories", getAllCategories);

app.get("/admin-prodcuts",adminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly,deleteProduct);

export default app;
