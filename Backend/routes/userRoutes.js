import express from "express";
import {
  DownloadSheetController,
  GetAllDetailController,
  GetDetailController,
  SignController,
  forgetController,
  loginController,
  logoutHandler,
} from "../controller/userController.js";

import { isAdmin, isRequired } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/sign", SignController);
route.post("/login", loginController);
route.post("/password/reset", forgetController);
route.get("/deta/:id", isRequired, GetDetailController);
route.post("/logout", isRequired, logoutHandler);
route.get("/deta", isRequired,isAdmin, GetAllDetailController);
route.get("/download-excel", DownloadSheetController);
// Protected user route Auth
route.get("/user-auth", isRequired, (req, res) => {
  res.status(200).send({ ok: true });
});
// protect admin route Auth
route.get("/admin-auth", isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default route;
