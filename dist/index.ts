"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express12 = __toESM(require("../node_modules/express/index.js"));
var import_cors = __toESM(require("../node_modules/cors/lib/index.js"));
var import_dotenv = __toESM(require("../node_modules/dotenv/lib/main.js"));

// src/config/db.ts
var import_mongoose = __toESM(require("../node_modules/mongoose/index.js"));
var ConnectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.log("MongoDB URI Not Defined");
      return;
    }
    await import_mongoose.default.connect(uri);
    console.log("Mongo DB connected successfully");
  } catch (error) {
    console.log("DB connection error", error);
  }
};

// src/routes/Route.ts
var import_express11 = require("../node_modules/express/index.js");

// src/routes/City.route.ts
var import_express = require("../node_modules/express/index.js");

// src/models/City.model.ts
var import_mongoose2 = __toESM(require("../node_modules/mongoose/index.js"));
var CitySchema = new import_mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });
var City = import_mongoose2.default.model("City", CitySchema);

// src/controllers/City.controller.ts
var CreateCity = async (req, res) => {
  const data = req.body;
  try {
    const newCity = await City.create(data);
    res.status(200).send({ message: "City Created Successfully", response: newCity });
  } catch (error) {
    res.status(400).send({ message: "Failed to create City", error });
  }
};
var UpdateCity = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedCity = await City.findByIdAndUpdate(id, data, { new: true });
    if (!updatedCity) {
      return res.status(404).send({ message: "City not found" });
    }
    res.status(200).send({ message: "City updated Successfully", response: updatedCity });
  } catch (error) {
    res.status(400).send({ message: "Failed to update City", error });
  }
};
var DeleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) {
      return res.status(404).send({ message: "City not found" });
    }
    res.status(200).send({ message: "City deleted Successfully" });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete City", error });
  }
};
var GetAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    if (cities.length === 0) {
      return res.status(404).send({ message: "No cities found" });
    }
    res.status(200).send({ message: "All Cities Retrieved Successfully", response: cities });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve cities", error });
  }
};
var GetCity = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findById(id);
    if (!city) {
      return res.status(404).send({ message: "City not found" });
    }
    res.status(200).send({ message: "City found Successfully", response: city });
  } catch (error) {
    res.status(400).send({ message: "Failed to find City", error });
  }
};

// src/routes/City.route.ts
var CityRoute = (0, import_express.Router)();
CityRoute.get("/:id", GetCity);
CityRoute.get("/", GetAllCities);
CityRoute.post("/", CreateCity);
CityRoute.put("/:id", UpdateCity);
CityRoute.delete("/:id", DeleteCity);

// src/routes/Order.route.ts
var import_express2 = require("../node_modules/express/index.js");

// src/models/Order.model.ts
var import_mongoose3 = __toESM(require("../node_modules/mongoose/index.js"));
var OrderSchema = new import_mongoose3.default.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    city: {
      type: import_mongoose3.default.Schema.Types.ObjectId,
      ref: "City",
      required: true
    },
    area: {
      type: import_mongoose3.default.Schema.Types.ObjectId,
      ref: "Area",
      required: true
    },
    shop: {
      type: import_mongoose3.default.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },
    items: [
      {
        product_id: {
          type: import_mongoose3.default.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          max: 5
        }
      }
    ],
    paymentMethod: {
      type: String,
      enum: ["cod", "card"],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "processing", "shipped"]
    }
  },
  { timestamps: true }
);
var Order = import_mongoose3.default.model("Order", OrderSchema);

// src/controllers/Order.controller.ts
var CreateOrder = async (req, res) => {
  const data = req.body;
  try {
    const response = await Order.create(data);
    res.status(200).send({ message: "Order Created Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Order", error });
  }
};
var UpdateOrder = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const response = await Order.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({ message: "Order Updated Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to Update Order", error });
  }
};
var DeleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Order.findByIdAndDelete(id);
    res.status(200).send({ message: "Order Deleted Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to Delete Order", error });
  }
};
var GetAllOrders = async (req, res) => {
  try {
    const response = await Order.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ message: "Failed to Find Orders", error });
  }
};
var GetOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Order.findById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ message: "Failed to Find Order", error });
  }
};

// src/routes/Order.route.ts
var OrderRoute = (0, import_express2.Router)();
OrderRoute.get("/:id", GetOrder);
OrderRoute.get("", GetAllOrders);
OrderRoute.post("", CreateOrder);
OrderRoute.put("/:id", UpdateOrder);
OrderRoute.delete("/:id", DeleteOrder);

// src/routes/Product.route.ts
var import_express3 = require("../node_modules/express/index.js");

// src/models/Product.model.ts
var import_mongoose5 = __toESM(require("../node_modules/mongoose/index.js"));

// src/models/Category.model.ts
var import_mongoose4 = __toESM(require("../node_modules/mongoose/index.js"));
var CategorySchema = new import_mongoose4.default.Schema(
  {
    name: {
      type: String,
      required: true
    },
    subcategories: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);
var Category = import_mongoose4.default.model("Category", CategorySchema);

// src/models/Product.model.ts
var ProductSchema = new import_mongoose5.default.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: import_mongoose5.default.Schema.Types.ObjectId,
      ref: Category,
      required: true
    },
    images: {
      type: [String],
      required: false
    },
    subcategory: {
      type: String
    }
  },
  { timestamps: true }
);
var Product = import_mongoose5.default.model("Product", ProductSchema);

// src/controllers/Product.controller.ts
var CreateProduct = async (req, res) => {
  const { name, price, category, images, subcategory } = req.body;
  try {
    const response = await Product.create({ name, price, category, images, subcategory });
    res.status(200).send({ message: "Successfully created Product", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Product", error });
  }
};
var UpdateProduct = async (req, res) => {
  const { name, price, category, images, subcategory } = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: " Product ID is not defined" });
  }
  try {
    const response = await Product.findByIdAndUpdate(id, { name, price, category, images, subcategory }, { new: true });
    res.status(200).send({ message: "Successfully updated Product", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to update Product", error });
  }
};
var DeleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: " Product ID is not defined" });
  }
  try {
    const response = await Product.findByIdAndDelete(id);
    res.status(200).send({ message: "Successfully deleted Product", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete Product", error });
  }
};
var GetAllProducts = async (req, res) => {
  try {
    const response = await Product.find();
    res.status(200).send({ message: "Successfully retrieved Products", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Products", error });
  }
};
var GetProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: " Product ID is not defined" });
  }
  try {
    const response = await Product.findById(id);
    res.status(200).send({ message: "Successfully retrieved Product", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Product", error });
  }
};

// src/routes/Product.route.ts
var ProductRoute = (0, import_express3.Router)();
ProductRoute.get("/:id", GetProduct);
ProductRoute.get("/", GetAllProducts);
ProductRoute.post("/", CreateProduct);
ProductRoute.put("/:id", UpdateProduct);
ProductRoute.delete("/:id", DeleteProduct);

// src/routes/Shop.route.ts
var import_express4 = require("../node_modules/express/index.js");

// src/models/Shop.model.ts
var import_mongoose6 = __toESM(require("../node_modules/mongoose/index.js"));
var ShopSchema = new import_mongoose6.default.Schema(
  {
    name: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    ownername: {
      type: String,
      required: true
    },
    city: {
      type: import_mongoose6.default.Schema.Types.ObjectId,
      ref: "City",
      required: true
    },
    area: {
      type: import_mongoose6.default.Schema.Types.ObjectId,
      ref: "Area",
      required: true
    }
  },
  { timestamps: true }
);
var Shop = import_mongoose6.default.model("Shop", ShopSchema);

// src/controllers/Shop.controller.ts
var CreateShop = async (req, res) => {
  const data = req.body;
  try {
    const response = await Shop.create(data);
    res.status(200).send({ message: "Successfully created Shop", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Shop", error });
  }
};
var UpdateShop = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "Shop Id is not defined ." });
  }
  try {
    const response = await Shop.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({ message: "Successfully updated Shop", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to update Shop", error });
  }
};
var DeleteShop = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "Shop Id is not defined ." });
  }
  try {
    const response = await Shop.findByIdAndDelete(id);
    res.status(200).send({ message: "Successfully deleted Shop", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete Shop", error });
  }
};
var GetAllShops = async (req, res) => {
  try {
    const response = await Shop.find();
    res.status(200).send({ message: "Successfully retrieved Shops", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Shops", error });
  }
};
var GetShop = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "Shop Id is not defined ." });
  }
  try {
    const response = await Shop.findById(id);
    res.status(200).send({ message: "Successfully retrieved Shop", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Shop", error });
  }
};

// src/routes/Shop.route.ts
var ShopRoute = (0, import_express4.Router)();
ShopRoute.get("/:id", GetShop);
ShopRoute.get("", GetAllShops);
ShopRoute.post("", CreateShop);
ShopRoute.put("/:id", UpdateShop);
ShopRoute.delete("/:id", DeleteShop);

// src/routes/Auth.route.ts
var import_express5 = require("../node_modules/express/index.js");

// src/models/User.model.ts
var import_mongoose7 = __toESM(require("../node_modules/mongoose/index.js"));
var UserSchema = new import_mongoose7.default.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      default: "salesman",
      enum: ["admin", "salesman"]
    },
    resetCode: {
      type: String,
      default: null
    },
    resetCodeExpiry: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);
var User = import_mongoose7.default.model("User", UserSchema);

// src/controllers/Auth.controller.ts
var import_bcrypt = __toESM(require("../node_modules/bcrypt/bcrypt.js"));
var import_jsonwebtoken = __toESM(require("../node_modules/jsonwebtoken/index.js"));
var register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ message: "Email already taken" });
      return;
    }
    const hashedPassword = await import_bcrypt.default.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};
var login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }
    const isMatch = await import_bcrypt.default.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }
    const token = import_jsonwebtoken.default.sign(
      { userId: user._id, username: user.username, role: user.role, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error: error.message });
  }
};
var tokenAuth = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(401).json({ auth: false, data: "No token found in request" });
    return;
  }
  try {
    const decrypt = import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET || "default_secret");
    res.status(200).json({ auth: true, data: decrypt });
  } catch (error) {
    res.status(401).json({ auth: false, data: "Invalid or expired token" });
  }
};

// src/middlewares/auth/register/Register.Validation.ts
var import_joi = __toESM(require("../node_modules/joi/lib/index.js"));
var registerValidation = import_joi.default.object({
  username: import_joi.default.string().required(),
  email: import_joi.default.string().email().required(),
  password: import_joi.default.string().min(6).required(),
  role: import_joi.default.string().default("salesman")
});

// src/middlewares/auth/register/Register.Middlweare.ts
var RegisterMiddleware = (req, res, next) => {
  const { error } = registerValidation.validate(req.body, {
    abortEarly: false
  });
  if (error) {
    res.status(400).json({ message: "Data is not valid", Details: error.details });
    return;
  }
  next();
};

// src/middlewares/auth/login/Login.Validation.ts
var import_joi2 = __toESM(require("../node_modules/joi/lib/index.js"));
var LoginValidation = import_joi2.default.object({
  username: import_joi2.default.string().required(),
  password: import_joi2.default.string().min(8).required()
});

// src/middlewares/auth/login/Login.middleware.ts
var LoginMiddleware = (req, res, next) => {
  const { error } = LoginValidation.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ message: "Data is nor valid", Details: error.details });
    return;
  }
  next();
};

// src/routes/Auth.route.ts
var AuthRoute = (0, import_express5.Router)();
AuthRoute.post("/register", RegisterMiddleware, register);
AuthRoute.post("/login", LoginMiddleware, login);
AuthRoute.post("/auth", tokenAuth);

// src/routes/User.route.ts
var import_express6 = require("../node_modules/express/index.js");

// src/controllers/User.controller.ts
var CreateUser = async (req, res) => {
  const data = req.body;
  try {
    const response = await User.create(data);
    res.status(200).send({ message: "Successfully created User", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create User", error });
  }
};
var UpdateUser = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const response = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({ message: "Successfully updated User", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to update User", error });
  }
};
var DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findByIdAndDelete(id);
    res.status(200).send({ message: "Successfully deleted User", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete User", error });
  }
};
var GetAllUser = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).send({ message: "Successfully retrieved Shops", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve Shops", error });
  }
};
var GetUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findById(id);
    res.status(200).send({ message: "Successfully retrieved User", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve User", error });
  }
};

// src/routes/User.route.ts
var UserRoute = (0, import_express6.Router)();
UserRoute.get("/:id", GetUser);
UserRoute.get("", GetAllUser);
UserRoute.post("", CreateUser);
UserRoute.put("/:id", UpdateUser);
UserRoute.delete("/:id", DeleteUser);

// src/routes/Category.route.ts
var import_express7 = require("../node_modules/express/index.js");

// src/controllers/Category.controller.ts
var CreateCategory = async (req, res) => {
  const data = req.body;
  try {
    const response = await Category.create(data);
    res.status(200).send({ message: "Category Created Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Category", error });
  }
};
var UpdateCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const response = await Category.findByIdAndUpdate(id, data, { new: true });
    res.status(200).send({ message: "Category updated Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to update Category", error });
  }
};
var DeleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).send({ message: "Category deleted Successfully" });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete Category", error });
  }
};
var GetAllCategories = async (req, res) => {
  try {
    const response = await Category.find();
    res.status(200).send({ message: "All Areas Retrieved Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to find any Category", error });
  }
};
var GetCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Category.findById(id);
    res.status(200).send({ message: "Category found Successfully", response });
  } catch (error) {
    res.status(400).send({ message: "Failed to find Category", error });
  }
};

// src/routes/Category.route.ts
var CategoryRoute = (0, import_express7.Router)();
CategoryRoute.get("/:id", GetCategory);
CategoryRoute.get("/", GetAllCategories);
CategoryRoute.post("/", CreateCategory);
CategoryRoute.put("/:id", UpdateCategory);
CategoryRoute.delete("/:id", DeleteCategory);

// src/routes/File.route.ts
var import_express8 = require("../node_modules/express/index.js");

// src/config/multerConfig.ts
var import_multer = __toESM(require("../node_modules/multer/index.js"));
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var uploadDirectory = import_path.default.join(__dirname, "../../uploads");
if (!import_fs.default.existsSync(uploadDirectory)) {
  import_fs.default.mkdirSync(uploadDirectory, { recursive: true });
}
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const ext = import_path.default.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  }
});
var upload = (0, import_multer.default)({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .png, .jpg formats are allowed"));
    }
  }
});

// src/controllers/File.controller.ts
var import_fs2 = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var uploadDirectory2 = import_path2.default.join(__dirname, "../../uploads");
var uploadFile = (req, res) => {
  if (!import_fs2.default.existsSync(uploadDirectory2)) {
    import_fs2.default.mkdirSync(uploadDirectory2, { recursive: true });
  }
  if (req.files) {
    const filePaths = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );
    res.json({ success: true, filePaths });
    return;
  }
  res.status(400).json({ success: false, message: "No files uploaded" });
};
var deleteFile = (req, res) => {
  const { filename } = req.params;
  const filePath = import_path2.default.join(__dirname, "../../uploads/", filename);
  import_fs2.default.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "File not found or already deleted" });
    }
    res.json({ success: true, message: "File deleted successfully" });
  });
};

// src/routes/File.route.ts
var FileRoute = (0, import_express8.Router)();
FileRoute.post("/", upload.array("images", 5), uploadFile);
FileRoute.delete("/:filename", deleteFile);

// src/routes/Area.route.ts
var import_express9 = require("../node_modules/express/index.js");

// src/models/Area.model.ts
var import_mongoose8 = __toESM(require("../node_modules/mongoose/index.js"));
var AreaSchema = new import_mongoose8.default.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: import_mongoose8.default.Schema.Types.ObjectId,
    ref: City,
    required: true
  }
});
var Area = (0, import_mongoose8.model)("Area", AreaSchema);

// src/controllers/Area.controller.ts
var CreateArea = async (req, res) => {
  const data = req.body;
  try {
    const newArea = await Area.create(data);
    res.status(200).send({ message: "Area Created Successfully", response: newArea });
  } catch (error) {
    res.status(400).send({ message: "Failed to create Area", error });
  }
};
var UpdateArea = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updateArea = await Area.findByIdAndUpdate(id, data, { new: true });
    if (!updateArea) {
      return res.status(404).send({ message: "Area not found" });
    }
    res.status(200).send({ message: "Area updated Successfully", response: updateArea });
  } catch (error) {
    res.status(400).send({ message: "Failed to update Area", error });
  }
};
var DeleteArea = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteArea = await Area.findByIdAndDelete(id);
    if (!deleteArea) {
      return res.status(404).send({ message: "Area not found" });
    }
    res.status(200).send({ message: "Area deleted Successfully" });
  } catch (error) {
    res.status(400).send({ message: "Failed to delete Area", error });
  }
};
var GetAllAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    if (areas.length === 0) {
      return res.status(404).send({ message: "No areas found" });
    }
    res.status(200).send({ message: "All Cities Retrieved Successfully", response: areas });
  } catch (error) {
    res.status(400).send({ message: "Failed to retrieve areas", error });
  }
};
var GetArea = async (req, res) => {
  const { id } = req.params;
  try {
    const area = await Area.findById(id);
    if (!area) {
      return res.status(404).send({ message: "Area not found" });
    }
    res.status(200).send({ message: "Area found Successfully", response: area });
  } catch (error) {
    res.status(400).send({ message: "Failed to find Area", error });
  }
};

// src/routes/Area.route.ts
var AreaRoute = (0, import_express9.Router)();
AreaRoute.get("/:id", GetArea);
AreaRoute.get("/", GetAllAreas);
AreaRoute.post("/", CreateArea);
AreaRoute.put("/:id", UpdateArea);
AreaRoute.delete("/:id", DeleteArea);

// src/middlewares/city/city.Validation.ts
var import_joi3 = __toESM(require("../node_modules/joi/lib/index.js"));
var cityValidationSchema = import_joi3.default.object({
  name: import_joi3.default.string().trim().required()
});

// src/middlewares/city/city.Middleware.ts
var ValidateCity = (req, res, next) => {
  const { error } = cityValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

// src/middlewares/order/Order.Validation.ts
var import_joi4 = __toESM(require("../node_modules/joi/lib/index.js"));
var orderValidationSchema = import_joi4.default.object({
  name: import_joi4.default.string().trim().required(),
  email: import_joi4.default.string().email().required(),
  city: import_joi4.default.string().trim().required(),
  area: import_joi4.default.string().trim().required(),
  shop: import_joi4.default.string().trim().required(),
  items: import_joi4.default.array().min(1).required(),
  paymentMethod: import_joi4.default.string().valid("cod", "card").required(),
  price: import_joi4.default.number().required(),
  status: import_joi4.default.string().default("pending").required()
});

// src/middlewares/order/Order.Middleware.ts
var validateOrder = (req, res, next) => {
  const { error } = orderValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

// src/middlewares/product/Product.Validation.ts
var import_joi5 = __toESM(require("../node_modules/joi/lib/index.js"));
var productValidationSchema = import_joi5.default.object({
  name: import_joi5.default.string().trim().required(),
  price: import_joi5.default.number().min(0).required(),
  category: import_joi5.default.string().regex(/^[a-f\d]{24}$/i).required(),
  images: import_joi5.default.array().items(import_joi5.default.string().uri()).optional(),
  subcategory: import_joi5.default.string().optional()
});

// src/middlewares/product/Product.Middleware.ts
var validateProduct = (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body, {
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

// src/middlewares/shop/Shop.Validation.ts
var import_joi6 = __toESM(require("../node_modules/joi/lib/index.js"));
var shopValidationSchema = import_joi6.default.object({
  name: import_joi6.default.string().trim().required(),
  contact: import_joi6.default.string().regex(/03[0-9]{2}[0-9]{7}/).required(),
  city: import_joi6.default.string().trim().required(),
  area: import_joi6.default.string().trim().required(),
  ownername: import_joi6.default.string().trim().required()
});

// src/middlewares/shop/Shop.Middleware.ts
var validateShop = (req, res, next) => {
  const { error } = shopValidationSchema.validate(req.body, {
    abortEarly: false
  });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

// src/middlewares/category/Category.Validation.ts
var import_joi7 = __toESM(require("../node_modules/joi/lib/index.js"));
var categoryValidation = import_joi7.default.object({
  name: import_joi7.default.string().trim().required(),
  subcategories: import_joi7.default.array().items(import_joi7.default.string().trim()).default([])
});

// src/middlewares/category/Category.Middleware.ts
var ValidateCategory = (req, res, next) => {
  const { error } = categoryValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

// src/routes/ResetPass.route.ts
var import_express10 = require("../node_modules/express/index.js");

// src/controllers/ResetPass.controller.ts
var import_nodemailer = __toESM(require("../node_modules/nodemailer/lib/nodemailer.js"));
var import_bcrypt2 = __toESM(require("../node_modules/bcrypt/bcrypt.js"));
var requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User doesn't exist" });
      return;
    }
    const resetCode = Math.floor(1e5 + Math.random() * 9e5).toString();
    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1e3);
    user.resetCode = resetCode;
    user.resetCodeExpiry = resetCodeExpiry;
    await user.save();
    const transporter = import_nodemailer.default.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset Verification Code",
      text: `Your password reset verification code is: ${resetCode}. It is valid for the next 15 minutes.`
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Verification code sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
var resetPassword = async (req, res) => {
  const { email, code, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User doesn't exist!" });
      return;
    }
    if (user.resetCode !== code || !user.resetCodeExpiry || user.resetCodeExpiry < /* @__PURE__ */ new Date()) {
      res.status(400).json({ message: "Invalid or expired verification code" });
      return;
    }
    const encryptedPassword = await import_bcrypt2.default.hash(password, 10);
    user.password = encryptedPassword;
    user.resetCode = null;
    user.resetCodeExpiry = null;
    await user.save();
    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// src/routes/ResetPass.route.ts
var ResetRoute = (0, import_express10.Router)();
ResetRoute.post("/reset", resetPassword);
ResetRoute.post("/requestreset", requestPasswordReset);

// src/middlewares/area/Area.validation.ts
var import_joi8 = __toESM(require("../node_modules/joi/lib/index.js"));
var areaValidation = import_joi8.default.object({
  name: import_joi8.default.string().trim().required(),
  city: import_joi8.default.string().trim().required()
});

// src/middlewares/area/Area.Middleware.ts
var ValidateArea = (req, res, next) => {
  const { error } = areaValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Data is not valid", details: error.details });
  }
  next();
};

// src/routes/Route.ts
var router = (0, import_express11.Router)();
router.use("/auth", AuthRoute);
router.use("/reset", ResetRoute);
router.use("/city", ValidateCity, CityRoute);
router.use("/area", ValidateArea, AreaRoute);
router.use("/order", validateOrder, OrderRoute);
router.use("/product", validateProduct, ProductRoute);
router.use("/shop", validateShop, ShopRoute);
router.use("/category", ValidateCategory, CategoryRoute);
router.use("/user", UserRoute);
router.use("/upload", FileRoute);

// src/index.ts
var import_node_path = __toESM(require("node:path"));
import_dotenv.default.config();
var app = (0, import_express12.default)();
var port = process.env.PORT || 5e3;
app.use(
  (0, import_cors.default)({
    credentials: true
  })
);
app.use(import_express12.default.json());
app.use((0, import_express12.urlencoded)({ extended: false }));
app.get("/", (req, res) => {
  res.json({ Message: "Hello from backend" });
});
app.use("/api", router);
app.use("/uploads", import_express12.default.static(import_node_path.default.join(__dirname, "../uploads")));
ConnectDB();
app.listen(port, () => {
  console.log(`Servers is running on http://localhost:${port}`);
});
