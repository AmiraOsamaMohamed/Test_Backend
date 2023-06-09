const auth =require("express").Router();
const conn=require("../db/connection");
const { body, validationResult } = require("express-validator");
const util = require("util"); 
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// REGISTRATION
auth.post(
    "/register",
    body("email").isEmail().withMessage("please enter a valid email!"),
    body("firstName").isString().withMessage("please enter a valid name"),
    body("lastName").isString().withMessage("please enter a valid name"),  
    body("skill").isString().withMessage("please enter a valid skills"),  
    body("aboutYou").isString().withMessage("please enter a valid description about your lastJobs"), 
    body("phone").isNumeric().isLength({ min:11 , max:11 }).withMessage("please enter a valid number consists of 11 number"),     
    body("password").isLength({ min: 8, max: 10 }).withMessage("password should be between (8-10) character"),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const query = util.promisify(conn.query).bind(conn); 
        const checkEmailExists = await query(
          "select * from user where email = ?",
          [req.body.email]
        );
        if (checkEmailExists.length > 0) {
          res.status(400).json({
            errors: [
              {
                msg: "email already exists try another one",
              },
            ],
          });
        }
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone:req.body.phone,
          aboutYou:req.body.aboutYou,
          skill:req.body.skill,
          password: await bcrypt.hash(req.body.password, 10),
          token:crypto.randomBytes(16).toString("hex"), 
        };
        await query("insert into user set ? ", user);
        // delete user.password;  // delete password from obj only not db to be hidden from frontend
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ err: err });
      }
    }
  );
//logIn
auth.post(
  "/login",
  body("email").isEmail().withMessage("please enter a valid email!"),
  body("password")
      .isLength({ min: 8, max: 12 })
      .withMessage("password should be between (8-12) character"),
  async (req, res) => {
      try {
          // 1- VALIDATION REQUEST [manual, express validation]
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }

          // 2- CHECK IF EMAIL EXISTS
          const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
          const user = await query("select * from user where email = ?", [
              req.body.email,
          ]);
          if (user.length == 0) {
              res.status(404).json({
                  errors: [
                      {
                          msg: "email or password not found !",
                      },
                  ],
              });
          }

          // 3- COMPARE HASHED PASSWORD
          const checkPassword = await bcrypt.compare(
              req.body.password,
              user[0].password
          );
          if (checkPassword) {
              delete user[0].password;
              res.status(200).json(user[0]);
          } else {
              res.status(404).json({
                  errors: [
                      {
                          msg: "email or password not matches !",
                      },
                  ],
              });
          }
      } catch (err) {
          console.log(err);
          res.status(500).json({ err: err });
      }
  }
);
//logOut 
auth.get(
  '/logout', function (req, res, next) {
      if (req.session) {
          // delete session object
          req.session.destroy(function (err) {
              if (err) {
                  return next(err);
              } else {
                  return res.redirect('/');
              }
          });
      }
  });
module.exports=auth;