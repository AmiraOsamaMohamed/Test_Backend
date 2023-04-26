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
const {constant}=require("buffer");
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
//show job_application
router.get("/job/aboutUser",
    admin,
    async (req, res) => {
        try {
            const query = util.promisify(conn.query).bind(conn);
            const requestedJobs = await query(
              (`SELECT acceptance,position,qualification,skill,aboutYou,firstName,job_id from user join job_application
            on user.id=user_id join job on job_id=job.id` ));
            res.status(200).json(requestedJobs);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    }
)

//SHOW REQUESED JOBS
router.get("/job/requestedJobs",
    user,
    async (req, res) => {
        try {
            const query = util.promisify(conn.query).bind(conn);
            let userId = res.locals.user.id;
            const requestedJobs = await query(`SELECT * FROM job 
                JOIN 
                (SELECT job_id FROM job_application WHERE user_id = ?) as users_jobs
                ON job.id = users_jobs.job_id`, [
                userId,
            ]);
            res.status(200).json(requestedJobs);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    }
)

// SHOW job [ADMIN, USER]
router.get("/job/getJob/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const job = await query("select * from job where id = ?", [
        req.params.name,
    ]);
    if (!job[0]) {
        res.status(404).json({ ms: "job not found!" });
    }
    //job[0].image_url = "http://" + req.hostname + ":4000/" + job[0].image_url;

    res.status(200).json(job[0]);
});

//   // MAKE apply [ADMIN, USER]
router.post("/job/apply",
    user,
    body("job_id").isNumeric().withMessage("please enter a valid Job ID"),
    async (req, res) => {
        try {
            const query = util.promisify(conn.query).bind(conn);
            // 1- VALIDATION REQUEST [manual, express validtion]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // 2- CHECK IF job EXISTS OR NOT
            const job = await query("select * from job where id = ?", [
                req.body.job_id,
            ]);
            if (!job[0]) {
                res.status(404).json({ ms: "job not found !" });
            }
            //3- check the number of applicaint to this job 
            const Number_applicaint = await query("select count(job_id) from job_application where job_id =? ",
                [req.body.job_id]);
            if (Number_applicaint >= 10) {
                res.status(400).json({ ms: "Job is not available anymore" });
            }
            // 4 - PREPARE job apply OBJECT
            const applyObj = {
                user_id: res.locals.user.id,
                job_id: job[0].id
            };

            // 4- INSERT job OBJECT INTO DATABASE
            await query("insert into job_application set ?", applyObj);

            res.status(200).json({
                msg: "apply added successfully !",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);
//###########update in acceptance of job
router.put('/update-job-acceptance/:id', admin,
  body("acceptance").isBoolean().withMessage("please enter a valid job acceptance"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const jobs = await query("select * from job_application where id = ?", [
        req.params.id,
      ]);
      if (!jobs[0]) {
        res.status(404).json({ ms: "job not found !" });
      }
      const jobObj = {
        acceptance: req.body.acceptance,
      };

      await query("update job_application set ? where id = ?", [jobObj, jobs[0].id]);

      res.status(200).json({
        msg: "Acceptance updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports=router;