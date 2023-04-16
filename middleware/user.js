const { uuid } = require('uuidv4');
const router = require("express").Router();
const conn = require("../db/connection");
const { body, validationResult } = require("express-validator");
const admin=require("./admin");
const util=require("util");
/////////////////////////////////////////////////////////////////////////////////////
// const firstName =document.getElementsByClassName('first-name');
// const lastName =document.getElementsByClassName('last-name');
// const email =document.getElementsByClassName('email');
// const password =document.getElementsByClassName('password');
// const phone= document.getElementsByClassName('number');
// const skill =document.getElementsByClassName('skills');
// const aboutYou=document.getElementsByClassName('ABout you');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////////update first name of user////////////
router.put('/update-user-firstName/:id', admin,
     body("firstName").isString().withMessage("please enter a valid first name"),
     async (req, res) => {
       try {
         const query = util.promisify(conn.query).bind(conn);
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }
         const users = await query("select * from user where id = ?", [
           req.params.id,
         ]);
         if (!users[0]) {
           res.status(404).json({ ms: "user not found !" });
         }
         const userObj = {
            firstName: req.body.firstName,
         };
   
         await query("update user set ? where id = ?", [userObj, users[0].id]);
   
         res.status(200).json({
           msg: "user updated successfully",
         });
       } catch (err) {
         res.status(500).json(err);
       }
     }
        );
           //////////////////update last name of user////////////
router.put('/update-user-lastName/:id', admin,
           body("lastName").isString().withMessage("please enter a valid last name"),
           async (req, res) => {
             try {
               const query = util.promisify(conn.query).bind(conn);
               const errors = validationResult(req);
               if (!errors.isEmpty()) {
                 return res.status(400).json({ errors: errors.array() });
               }
               const users = await query("select * from user where id = ?", [
                 req.params.id,
               ]);
               if (!users[0]) {
                 res.status(404).json({ ms: "user not found !" });
               }
               const userObj = {
                lastName: req.body.lastName,
               };
         
               await query("update user set ? where id = ?", [userObj, users[0].id]);
         
               res.status(200).json({
                 msg: "user updated successfully",
               });
             } catch (err) {
               res.status(500).json(err);
             }
           }
        );
         //////////////////update email of user////////////
router.put('/update-user-email/:id', admin,
         body("email").isEmail().withMessage("please enter a valid email"),
         async (req, res) => {
           try {
             const query = util.promisify(conn.query).bind(conn);
             const errors = validationResult(req);
             if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
             }
             const users = await query("select * from user where id = ?", [
               req.params.id,
             ]);
             if (!users[0]) {
               res.status(404).json({ ms: "user not found !" });
             }
             const userObj = {
                email: req.body.email,
             };
       
             await query("update user set ? where id = ?", [userObj, users[0].id]);
       
             res.status(200).json({
               msg: "user updated successfully",
             });
           } catch (err) {
             res.status(500).json(err);
           }
         }
        );
                //////////////////update password of user////////////
router.put('/update-user-password/:id', admin,
         body("password").isLength({ min: 8, max: 10 }).withMessage("password should be between (8-10) character"),
                async (req, res) => {
                  try {
                    const query = util.promisify(conn.query).bind(conn);
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                      return res.status(400).json({ errors: errors.array() });
                    }
                    const users = await query("select * from user where id = ?", [
                      req.params.id,
                    ]);
                    if (!users[0]) {
                      res.status(404).json({ ms: "user not found !" });
                    }

                    const userObj = {
                        password:req.body.password             //await bcrypt.hash(req.body.password, 10),
                    };
              
                    await query("update user set ? where id = ?", [userObj, users[0].id]);
              
                    res.status(200).json({
                      msg: "user updated successfully",
                    });
                  } catch (err) {
                    res.status(500).json(err);
                  }
                }
        );
            //////////////////update phone of user////////////
router.put('/update-user-phone/:id', admin,
    body("phone").isNumeric().isLength({ min:11 , max:11 }).withMessage("please enter a valid number consists of 11 number"),
            async (req, res) => {
              try {
                const query = util.promisify(conn.query).bind(conn);
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }
                const users = await query("select * from user where id = ?", [
                  req.params.id,
                ]);
                if (!users[0]) {
                  res.status(404).json({ ms: "user not found !" });
                }
                const userObj = {
                    phone: req.body.phone,
                };
          
                await query("update user set ? where id = ?", [userObj, users[0].id]);
          
                res.status(200).json({
                  msg: "user updated successfully",
                });
              } catch (err) {
                res.status(500).json(err);
              }
            }
           );
            //////////////////update status of user////////////
router.put('/update-user-status/:id', admin,
    body("status").isNumeric().withMessage("please enter a valid number").isLength(1).withMessage("status is 0 ==>active or 1==>inactive"),
            async (req, res) => {
              try {
                const query = util.promisify(conn.query).bind(conn);
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }
                const users = await query("select * from user where id = ?", [
                  req.params.id,
                ]);
                if (!users[0]) {
                  res.status(404).json({ ms: "user not found !" });
                }
                const userObj = {
                    status: req.body.status,
                };
          
                await query("update user set ? where id = ?", [userObj, users[0].id]);
          
                res.status(200).json({
                  msg: "user updated successfully",
                });
              } catch (err) {
                res.status(500).json(err);
              }
            }
               );
            //////////////////update skill of user////////////
router.put('/update-user-skill/:id', admin,
           body("skill").isString().withMessage("please enter a valid skills"),
           async (req, res) => {
             try {
               const query = util.promisify(conn.query).bind(conn);
               const errors = validationResult(req);
               if (!errors.isEmpty()) {
                 return res.status(400).json({ errors: errors.array() });
               }
               const users = await query("select * from user where id = ?", [
                 req.params.id,
               ]);
               if (!users[0]) {
                 res.status(404).json({ ms: "user not found !" });
               }
               const userObj = {
                skill: req.body.skill,
               };
         
               await query("update user set ? where id = ?", [userObj, users[0].id]);
         
               res.status(200).json({
                 msg: "user updated successfully",
               });
             } catch (err) {
               res.status(500).json(err);
             }
           }
        );
            //////////////////update about you of user////////////
router.put('/update-user-aboutYou/:id', admin,
            body("aboutYou").isString().withMessage("please enter a valid description about your last job"),
            async (req, res) => {
              try {
                const query = util.promisify(conn.query).bind(conn);
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }
                const users = await query("select * from user where id = ?", [
                  req.params.id,
                ]);
                if (!users[0]) {
                  res.status(404).json({ ms: "user not found !" });
                }
                const userObj = {
                    aboutYou: req.body.aboutYou,
                };
          
                await query("update user set ? where id = ?", [userObj, users[0].id]);
          
                res.status(200).json({
                  msg: "user updated successfully",
                });
              } catch (err) {
                res.status(500).json(err);
              }
            }
         );
      /////////////assignment user///////////////
router.post("/create-user",admin,           
      body("firstName").isString().withMessage("please enter a valid first name"),
      body("lastName").isString().withMessage("please enter a valid last name "),
      body("email").isEmail().withMessage("please enter a valid email "),
      body("phone").isNumeric().isLength({ min:11 , max:11 }).withMessage("please enter a valid number consists of 11 number"),     
      body("password").isLength({ min: 8, max: 10 }).withMessage("password should be between (8-10) character"),
      body("skill").isString().withMessage("please enter a valid skill "),
      body("aboutYou").isString().withMessage("please enter a valid description about your last job "),
      async(req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email:req.body.email,
            phone:req.body.phone,
            skill:req.body.skill,
            aboutYou: req.body.aboutYou,
            password: await bcrypt.hash(req.body.password, 10),
            token:crypto.randomBytes(16).toString("hex"),
          };
          const query = util.promisify(conn.query).bind(conn);
          await query("insert into user set ? ", newUser);
          // delete user.password;  // delete password from obj only not db to be hidden from frontend
          res.status(200).json(newUser);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    ); 
//###########delete spacific user
router.delete('/delete-user/:id', admin,
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const users = await query("select * from user where id = ?", [
        req.params.id,
      ]);
      if (!users[0]) {
        res.status(404).json({ ms: "user not found !" });
      }
      await query("delete from user where id = ?", [users[0].id]);
      res.status(200).json({
        msg: "user delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
); 
//####list users
router.get('/get-users',admin ,async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const users = await query("select * from user ");
  res.status(200).json(users);
});
          module.exports = router;