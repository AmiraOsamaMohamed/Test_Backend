const router =require("express").Router();
const conn=require("../db/connection");
const { uuid } = require('uuidv4');
const admin=require("../middleware/admin");
const user=require("../middleware/userAuthontication");
const autharized=require("../authontication/author");
const { body, validationResult } = require("express-validator");
const upload=require("../middleware/uploadImages");
const util = require('util'); // helper
const fs = require('fs'); // file system
///////###############create job
router.post("/create-job",admin,upload.single("image"),           
    body("position").isString().withMessage("please enter a valid job position"),
    body("description").isString().withMessage("please enter a valid description "),
    body("offer").isString().withMessage("please enter a valid offer "),
    body("qualification").isString().withMessage("please enter a valid qualification "),
    body("max_candidate_number").isNumeric().withMessage("please enter a valid number "),
    async(req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        if (!req.file) {
          return res.status(400).json({
            errors: [
              {
                msg: "Image is Required",
              },
            ],
          });
        }
        const newJob = {
          position: req.body.position,
          description: req.body.description,
          offer:req.body.offer,
          qualification:req.body.qualification,
          max_candidate_number:req.body.max_candidate_number,
          image_url: req.file.filename,
        };
        const query = util.promisify(conn.query).bind(conn);
        await query("insert into job set ? ", newJob);
        res.status(200).json({
          msg: "job created successfully !",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
// //##########update position of job
router.put('/update-job-position/:id', admin,
  body("position").isString().withMessage("please enter a valid job position"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const jobs = await query("select * from job where id = ?", [
        req.params.id,
      ]);
      if (!jobs[0]) {
        res.status(404).json({ ms: "job not found !" });
      }
      const jobObj = {
        position: req.body.position,
      };

      await query("update job set ? where id = ?", [jobObj, jobs[0].id]);

      res.status(200).json({
        msg: "job updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//#########update description of job
router.put('/update-job-description/:id', admin,
  body("description").isString().withMessage("please enter a valid job description"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const jobs = await query("select * from job where id = ?", [
        req.params.id,
      ]);
      if (!jobs[0]) {
        res.status(404).json({ ms: "job not found !" });
      }
      const jobObj = {
        description: req.body.description,
      };

      await query("update job set ? where id = ?", [jobObj, jobs[0].id]);

      res.status(200).json({
        msg: "job updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//#######update qualification of job
router.put('/update-job-qualification/:id',admin,
  body("qualification").isString().withMessage("please enter a valid job qualification"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const jobs = await query("select * from job where id = ?", [
        req.params.id
      ]);
      if (!jobs[0]) {
        res.status(404).json({ ms: "job not found !" });
      }
      const jobObj = {
        qualification: req.body.qualification
      };

      await query("update job set ? where id = ?", [jobObj, jobs[0].id]);

      res.status(200).json({
        msg: "job updated successfully"
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//#######update in offer of job
router.put('/update-job-offer/:id',admin,
  body("offer").isString().withMessage("please enter a valid job offer"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const jobs = await query("select * from job where id = ?", [req.params.id,]);
      if (!jobs[0]) {
        res.status(404).json({ ms: "job not found !" });
      }
      const jobObj = {
        offer: req.body.offer,
      };

      await query("update job set ? where id = ?", [jobObj, jobs[0].id]);

      res.status(200).json({
        msg: "job updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//###########update in max_candidate_number of job
router.put('/update-job-maxCandidateNumber/:id', admin,
  body("max_candidate_number").isNumeric().withMessage("please enter a valid job max_candidate_number"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const jobs = await query("select * from job where id = ?", [
        req.params.id,
      ]);
      if (!jobs[0]) {
        res.status(404).json({ ms: "job not found !" });
      }
      const jobObj = {
        max_candidate_number: req.body.max_candidate_number,
      };

      await query("update job set ? where id = ?", [jobObj, jobs[0].id]);

      res.status(200).json({
        msg: "job updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//############update image of job
router.put('/update-job-image_url/:id',admin,
  upload.single("image"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const jobs = await query("select * from job where id = ?", [
        req.params.id,
      ]);
      // req.send(jobs[0]);
      if (!jobs[0]) {
        res.status(404).json({ ms: "job not found !" });
      }
      const jobObj = {
        image_url: req.file.filename
      };

      if (req.file) {
        jobObj.image_url = req.file.filename;
        // fs.unlinkSync("../upload" + jobs[0].image_url); // delete old image
      }
      await query("update job set ? where id = ?", [jobObj, jobs[0].id]);

      res.status(200).json({
        msg: "job updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//###########delete job
router.delete('/delete-job/:id', admin,
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const jobs = await query("select * from job where id = ?", [
        req.params.id,
      ]);
      if (!jobs[0]) {
        res.status(404).json({ ms: "job not found !" });
      }
      // fs.unlinkSync("../upload" + jobs[0].image_url); // delete old image
      await query("delete from job where id = ?", [jobs[0].id]);
      res.status(200).json({
        msg: "job delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
); 
//####list jobs
router.get('/get-jobs',autharized ,async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    search = `where position LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
  }
  const jobs = await query(`select * from job ${search}`);
  jobs.map((job)=>{
    job.image_url="http://" + req.hostname + ":4000/" + job.image_url;
  });
  res.status(200).json(jobs);
});
//###########review for job
// router.post('/review-job',user,
//   body("job_id").isNumeric().withMessage("please enter a valid job ID"),
//   body("review").isString().withMessage("please enter a valid Review"),
//   async (req, res) => {
//     try {
//       const query = util.promisify(conn.query).bind(conn);
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       /////check job found or not
//       const jobs = await query("select * from job where id = ?", [
//         req.body.job_id,
//       ]);
//       if (!jobs[0]) {
//         res.status(404).json({ ms: "job not found !" });
//       }

//       // 3 - PREPARE MOVIE REVIEW OBJECT
//       const reviewObj = {
//         user_id: res.locals.user.id,
//         job_id: jobs[0].id,
//         review: req.body.review,
//       };
//       await query("insert into user_job set ?", reviewObj);

//       res.status(200).json({
//         msg: "review added successfully !",
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );
module.exports=router;