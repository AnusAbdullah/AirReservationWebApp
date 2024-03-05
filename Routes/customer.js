const express = require("express");
const { route } = require("express/lib/application");
const {
  getSignInPage,
  signUp,
  signIn,
  getdashboard,
  getcustomer,
  getairlines,
  getairplanes,
  logout,
  addairlines,
  editairlines,
  editlines,
  addlines,
  deletelines,
  deleteairlines,
  addairplanes,
  editairplanes,
  addplanes,
  deleteplanes,
  editplanes,
  deleteairplanes,
  getplanes,
  getcdashboard,
  gettickets,
} = require("../Controler/Login-Signin");
// express router
const router = express.Router();

router.route("/").get(getSignInPage);
router.route("/api/addUser").post(signUp);
router.route("/api/sign-in").post(signIn);
router.route("/api/dashboard").get(getdashboard);
router.route("/api/customer").get(getcustomer);
router.route("/api/airlines").get(getairlines);
router.route("/api/airplanes").get(getairplanes);
router.route("/api/logout").get(logout);
router.route("/api/addairlines").post(addairlines);
router.route("/api/editairlines").post(editairlines);
router.route("/api/deleteairlines").post(deleteairlines);
router.route("/api/addlines").get(addlines);
router.route("/api/editlines").get(editlines);
router.route("/api/deletelines").get(deletelines);

router.route("/api/addairplanes").post(addairplanes);
router.route("/api/editairplanes").post(editairplanes);
router.route("/api/deleteairplanes").post(deleteairplanes);
router.route("/api/addplanes").get(addplanes);
router.route("/api/editplanes").get(editplanes);
router.route("/api/deleteplanes").get(deleteplanes);

router.route("/api/cairlines").get(getplanes);
router.route("/api/cdashboard").get(getcdashboard);
router.route("/api/bookticket").get(gettickets);

module.exports = router;
