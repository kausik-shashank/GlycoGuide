const express = require("express");
const multer = require("multer");
const { restrictToLoggedInUser, checkAuth } = require("./middlewares/auth");
const {
  handlerSignupUser,
  handlerLoginUser,
  handlerDisplayHomepage,
  handlerRenderResponse,
  handlerResponseImage,
  handlerGetUserData,
  handlerStoreSugar,
  handlerStoreUserDetails,
} = require("./controllers/user");
const { connectMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "img.jpg");
  },
});

const upload = multer({ storage: storage });

connectMongoDB(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB started");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("views"));

app.set("view engine", "ejs");
app.get("/login", (req, res) => res.redirect("/"));
app.post("/login", handlerLoginUser);
app.post("/signup", handlerSignupUser);
app.get("/profile");
app.get("/stats", (req, res) => res.render("stats"));
app.get("/profile", (req, res) => res.render("profile"));
app.get("/logout", (req, res) => {
  res.cookie("uid", "", { maxAge: 1 });
  return res.redirect("/");
});
app.post("/sugar", restrictToLoggedInUser, handlerStoreSugar);
app.get("/api/data", restrictToLoggedInUser, handlerGetUserData);
app.get("/", restrictToLoggedInUser, handlerDisplayHomepage);
app.post("/", checkAuth, handlerRenderResponse);
app.post("/upload", upload.single("promptImage"), handlerResponseImage);
app.post("/details", checkAuth, handlerStoreUserDetails);

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
