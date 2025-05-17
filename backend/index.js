const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Global error handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend port
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Database connection
mongoose
  .connect(
    "mongodb+srv://Seyitan_Shalom:shalom03@cluster0.omslfbk.mongodb.net/e-commerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root test route
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

// Serve images
app.use("/images", express.static("upload/images"));

// Upload endpoint for images
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Mongoose Product schema
const Product = mongoose.model("product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// Create product API
app.post("/addproduct", async (req, res) => {
  try {
    console.log("📥 Raw request body:", req.body);

    const { name, image, category, new_price, old_price } = req.body;

    // Validate input
    if (
      !name ||
      !image ||
      !category ||
      new_price == null ||
      old_price == null
    ) {
      console.warn("⚠️ Missing fields");
      return res.status(400).json({
        success: false,
        message: "All product fields are required",
      });
    }

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const productData = {
      id,
      name,
      image,
      category,
      new_price: Number(new_price),
      old_price: Number(old_price),
    };

    console.log("📦 Product to save:", productData);

    const product = new Product(productData);
    const savedProduct = await product.save();

    console.log("✅ Saved:", savedProduct);

    res.status(201).json({ success: true, data: savedProduct });
  } catch (err) {
    console.error("❌ Add Product Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save product",
      error: err.message,
    });
  }
});

// Delete product API
app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product deleted:", req.body.id);
    res.json({ success: true, name: req.body.name });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
});

// Get all products API
app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("All Products Fetched:", products);
    res.send(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
});

//Schema creation for user model
const Users = mongoose.model("users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating Endpoint for user registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  let existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      errors: "User with this email already exists",
    });
  }

  const user = new Users({
    name,
    email,
    password,
    cartData: {}, // Start with an empty cart
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");

  res.json({
    success: true,
    token,
  });
});

//Creating Endpoint for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (!user) {
    return res.json({ success: false, errors: "Wrong Email Address" });
  }

  const passwordMatch = password === user.password;

  if (!passwordMatch) {
    return res.json({ success: false, errors: "Wrong Password" });
  }

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");

  res.json({
    success: true,
    token,
  });
});

//Creating endpoint for new collection data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newCollections = products.slice(1).slice(-8);
  console.log("New Collections fetched:", newCollections);
  res.send(newCollections);
});

//Creating endpoint for popukar in women category
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "Women" });
  let popularInWomen = products.slice(0, 4);
  console.log("Popular in women fetched:", popularInWomen);
  res.send(popularInWomen);
});

//Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "Please authenticate using a valid token" });
    }
  }
};

//Creating endpoint for adding product in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Add to cart request received:", req.body); // Debug log
  const { itemId, size } = req.body;

  if (!itemId || !size) {
    return res.status(400).json({
      success: false,
      message: "Item ID and size are required",
    });
  }

  try {
    let userData = await Users.findOne({ _id: req.user.id });

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Initialize itemId as an object if it doesn't exist
    if (typeof userData.cartData[itemId] !== "object") {
      userData.cartData[itemId] = {};
    }

    // Initialize size if it doesn't exist, or increment the quantity
    if (!userData.cartData[itemId][size]) {
      userData.cartData[itemId][size] = 1;
    } else {
      userData.cartData[itemId][size] += 1;
    }

    // Save the updated cart data
    userData = await Users.findByIdAndUpdate(
      req.user.id,
      { cartData: userData.cartData },
      { new: true }
    );

    console.log("Updated cart:", userData.cartData); // Debug log

    return res.json({
      success: true,
      message: "Added to cart successfully",
      cartData: userData.cartData,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding to cart",
    });
  }
});

//Creating endpoint to remove product from cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Remove request received:", req.body); // Debug log
  const { itemId, size } = req.body;

  if (!itemId || !size) {
    return res.status(400).json({
      success: false,
      message: "Item ID and size are required",
    });
  }

  try {
    let userData = await Users.findOne({ _id: req.user.id });

    if (!userData || !userData.cartData) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      });
    }

    if (!userData.cartData[itemId] || !userData.cartData[itemId][size]) {
      return res.status(404).json({
        success: false,
        message: "Item not in cart",
      });
    }

    // Update quantity
    if (userData.cartData[itemId][size] > 1) {
      userData.cartData[itemId][size] -= 1;
    } else {
      delete userData.cartData[itemId][size];
      if (Object.keys(userData.cartData[itemId]).length === 0) {
        delete userData.cartData[itemId];
      }
    }

    // Save the updated cart data
    userData = await Users.findByIdAndUpdate(
      req.user.id,
      { cartData: userData.cartData },
      { new: true }
    );

    console.log("Updated cart:", userData.cartData); // Debug log

    return res.json({
      success: true,
      message: "Item removed from cart",
      cartData: userData.cartData,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while removing item",
    });
  }
});

//Creating endpoint to fetch cart data
app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });

  if (!userData.cartData) {
    return res.json({});
  }

  res.json(userData.cartData);
});

// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log(`✅ Server running on port ${port}`);
  } else {
    console.log(`❌ Error starting server: ${error}`);
  }
});
