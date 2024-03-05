const express = require("express");
const sequelize = require("../Db/connect");

const user = require("../Model/customer");
const airlines = require("../Model/Airlines");
const airplanes = require("../Model/Airplanes");
const admin = require("../Model/Admin");
const sales = require("../Model/sales");
// const airlines = require("../Model/Airlines");
var username;
//Relations
airlines.hasMany(airplanes);
const getSignInPage = async (req, res, next) => {
  res.render("login-signin", { data: "hello get request" });
};

const signUp = async (req, res, next) => {
  const { cname, cemail, cpassword, caddress } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  try {
    await user.create({
      cname: cname,
      cemail: cemail,
      cpassword: cpassword,
      caddress: caddress,
    });
    console.log("User created");
    res.render("login-signin", { data: "sign-up successfully" });
  } catch (error) {
    // console.log(error);
    res.render("login-signin", { data: "email already exist" });
  }
};

const signIn = async (req, res, next) => {
  const { cemail, cpassword } = req.body;
  const getUser = await user.findOne({
    where: { cemail: cemail },
  });
  const getadmin = await admin.findOne({
    where: { email: cemail },
  });
  // console.log(getUser);
  // console.log(getadmin);
  if (getUser == null && getadmin == null) {
    res.render("login-signin", { data: "user not found" });
  } else if (getUser != null) {
    if (getUser.cemail === cemail && getUser.cpassword === cpassword) {
      username = getUser.cname;
      const aircount = await airlines.count();
      const ccount = await user.count();
      const planecount = await airplanes.count();
      const allairplanes = await airplanes.findAll();
      res.render("cdasboard", {
        data: username,
        customercount: ccount,
        airlinecount: aircount,
        airplanecount: planecount,
        companies: allairplanes,
      });
    }
  } else if (getadmin != null) {
    if (getadmin.email === cemail && getadmin.password === cpassword) {
      username = getadmin.name;
      const ccount = await user.count();
      const aircount = await airlines.count();
      const planecount = await airplanes.count();
      const allairplanes = await airplanes.findAll();
      res.render("Dashboard", {
        data: username,
        customercount: ccount,
        airlinecount: aircount,
        airplanecount: planecount,
        companies: allairplanes,
      });
    }
  }
};

const getdashboard = async (req, res, next) => {
  const ccount = await user.count();
  const aircount = await airlines.count();
  const planecount = await airplanes.count();
  const allairplanes = await airplanes.findAll();
  res.render("Dashboard", {
    data: username,
    customercount: ccount,
    airlinecount: aircount,
    airplanecount: planecount,
    companies: allairplanes,
  });
};

const getcustomer = async (req, res, next) => {
  const customers = await user.findAll();
  res.render("Customer", { data: username, users: customers });
};

const getairlines = async (req, res, next) => {
  const allairlines = await airlines.findAll();
  res.render("Airlines", {
    data: username,
    companies: allairlines,
    action: "Show",
  });
  // res.render("Airlines", { data: username });
};

const getairplanes = async (req, res, next) => {
  const allairplanes = await airplanes.findAll();
  res.render("Airplanes", {
    data: username,
    companies: allairplanes,
    action: "Show",
  });
  // res.render("Airplanes", { data: username });
};

const logout = async (req, res, next) => {
  res.render("login-signin");
};

const addairlines = async (req, res, next) => {
  const { id, name } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  try {
    await airlines.create({
      id: id,
      name: name,
    });

    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "Show",
    });
  } catch (error) {
    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "Show",
    });
  }
};

const editairlines = async (req, res, next) => {
  const { id, name } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  try {
    await airlines.update(
      {
        id: id,
        name: name,
      },
      { where: { id: id } }
    );

    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "Show",
    });
  } catch (error) {
    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "Show",
    });
  }
};

const editlines = async (req, res, next) => {
  const { id, name } = req.body;
  try {
    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "edit",
    });
  } catch (error) {
    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "edit",
    });
  }
};

const addlines = async (req, res, next) => {
  const { id, name } = req.body;
  try {
    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "add",
    });
  } catch (error) {
    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "add",
    });
  }
};

const deletelines = async (req, res, next) => {
  const { id, name } = req.body;
  try {
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "delete",
    });
  } catch (error) {
    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "delete",
    });
  }
};

const deleteairlines = async (req, res, next) => {
  const { id, name } = req.body;
  try {
    await airlines.destroy({ where: { id: id } });
    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "Show",
    });
  } catch (error) {
    const allairlines = await airlines.findAll();
    res.render("Airlines", {
      data: username,
      companies: allairlines,
      action: "Show",
    });
  }
};

////////////////////////////////////////////////////////////////

const addairplanes = async (req, res, next) => {
  const { id, name, departure, arrival, time, price, airlinesid } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  try {
    await airplanes.create({
      id: id,
      name: name,
      departure: departure,
      arrival: arrival,
      time: time,
      price: price,
      airlineId: airlinesid,
    });

    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "Show",
    });
  } catch (error) {
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "Show",
    });
  }
};

const editairplanes = async (req, res, next) => {
  const { id, name, departure, arrival, time, price, airlinesid } = req.body;

  // console.log(cname, cemail, cpassword, caddress);
  try {
    await airplanes.update(
      {
        id: id,
        name: name,
        departure: departure,
        arrival: arrival,
        time: time,
        price: price,
        airlineId: airlinesid,
      },
      { where: { id: id } }
    );

    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "Show",
    });
  } catch (error) {
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "Show",
    });
  }
};

const editplanes = async (req, res, next) => {
  // const { id, name } = req.body;
  try {
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "edit",
    });
  } catch (error) {
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "edit",
    });
  }
};

const addplanes = async (req, res, next) => {
  // const { id, name } = req.body;
  try {
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "add",
    });
  } catch (error) {
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "add",
    });
  }
};

const deleteplanes = async (req, res, next) => {
  // const { id, name } = req.body;
  try {
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "delete",
    });
  } catch (error) {
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "delete",
    });
  }
};

const deleteairplanes = async (req, res, next) => {
  const { id, name } = req.body;
  try {
    await airplanes.destroy({ where: { id: id } });
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "Show",
    });
  } catch (error) {
    const allairplanes = await airplanes.findAll();
    res.render("Airplanes", {
      data: username,
      companies: allairplanes,
      action: "Show",
    });
  }
};
///////////////////////////////////////////////////////////////////////////////

const getplanes = async (req, res, next) => {
  // const { id, name } = req.body;
  try {
    const allairplanes = await airplanes.findAll();
    const allairlines = await airlines.findAll();
    res.render("cairplanes", {
      data: username,
      companies1: allairplanes,
      companies2: allairlines,
      action: "delete",
    });
  } catch (error) {
    const allairplanes = await airplanes.findAll();
    const allairlines = await airlines.findAll();
    res.render("cairplanes", {
      data: username,
      companies1: allairplanes,
      companies2: allairlines,
      action: "delete",
    });
  }
};

const getcdashboard = async (req, res, next) => {
  const aircount = await airlines.count();
  const ccount = await user.count();
  const planecount = await airplanes.count();
  const allairplanes = await airplanes.findAll();
  res.render("cdasboard", {
    data: username,
    customercount: ccount,
    airlinecount: aircount,
    airplanecount: planecount,
    companies: allairplanes,
  });
  // res.render("cdasboard", { data: username });
};

const gettickets = async (req, res, next) => {
  res.render("bookticket", { data: username });
};

module.exports = {
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
  deleteairlines,
  editlines,
  addlines,
  deletelines,
  addairplanes,
  editairplanes,
  addplanes,
  deleteplanes,
  editplanes,
  deleteairplanes,
  getplanes,
  getcdashboard,
  gettickets,
};
