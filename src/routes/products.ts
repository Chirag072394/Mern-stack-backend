import express from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
  getAllProducts
} from "../controllers/product.js";
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//route - create new product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

//route- to get Products with filters  - /api/v1/product/all
app.get("/all", getAllProducts);

//route- get last 10 products - /api/v1/product/latest
app.get("/latest", getLatestProducts);

//To get all unique Categories - /api/v1/product/category
app.get("/categories", getAllCategories);

//to get all products -/api/v1/product/admin-products
app.get("/admin-products",adminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly,deleteProduct);

export default app;
