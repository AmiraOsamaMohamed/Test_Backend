const { uuid } = require('uuidv4');
const admin=require("express").Router();
const conn=require("../db/connection");
/////////////create job///////////////
// const firstName =document.getElementsByClassName('first-name');
// const lastName =document.getElementsByClassName('last-name');
// const email =document.getElementsByClassName('email');
// const password =document.getElementsByClassName('password');
// const phone= document.getElementsByClassName('number');
// const skill =document.getElementsByClassName('skills');
// const aboutYou=document.getElementsByClassName('ABout you');
///////////////////////////create job//////////////
admin.post('/create-job',(req, res)=>{
    const data=req.body;
    conn.query("insert into job set ?", {position:data.position,description:data.description,max_candidate_number:data.max_candidate_number,qualification:data.qualification},(err,result,fields)=>{
        if(err){
            res.send({
                message:"there is error in post values in db"
            })   
        }else{
            res.send({
                message:"job is created",
              });
        }
    })
  
   
    });
    //////////list job///////////////////
admin.get('/get-job',(req, res)=>{
    conn.query("select * from job",(err,result,fields)=>{
        if(err){
            res.send({
                message:"there is error in get values from db"
            })   
        }else{
            res.send(result);
        }
    })
   
  });
    //////////////////update in  position of  job////////////
admin.put('/update-job-position/:id',(req,res)=>{
      const { id }=req.params;
      const data=req.body;
     conn.query("update job set? where ?",[{position:data.position},{id:id}],(err,result)=>{
    if (err){
        res.statusCode=500;
        res.send({
            message:"there is error in update"
        });
    }else{
        res.send({
            message:"updated sucessfully"
           });
    }
     }) 
     });
         //////////////////update in  description of  job////////////
admin.put('/update-job-description/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update job set? where ?",[{description:data.description},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
       //////////////////update in  max cadidate number  of  job////////////
admin.put('/update-job-maxCandidateNumber/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update job set? where ?",[{max_candidate_number:data.max_candidate_number},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
       //////////////////update in  qualification of  job////////////
admin.put('/update-job-qualification/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update job set? where ?",[{qualification:data.qualification},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
     //////////////delete specific job
admin.delete('/delete-job/:id',(req,res)=>{
      const { id }=req.params;
      conn.query("delete from job where ?",{id:id},(err,result,fields)=>{
        if (err){
            res.statusCode=500;
            res.send({
                message:"there is error in delete"
            });
        } else{
       res.send({
        message:"deleted sucessfully"
       });
      }
     });
    });
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////////update first name of user////////////
admin.put('/update-user-firstName/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update user set? where ?",[{firstName:data.firstName},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
       //////////////////update last name of user////////////
admin.put('/update-user-lastName/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update user set? where ?",[{lastName:data.lastName},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   }); 
     //////////////////update email of user////////////
     admin.put('/update-user-email/:id',(req,res)=>{
        const { id }=req.params;
        const data=req.body;
       conn.query("update user set? where ?",[{email:data.email},{id:id}],(err,result)=>{
      if (err){
          res.statusCode=500;
          res.send({
              message:"there is error in update"
          });
      }else{
          res.send({
              message:"updated sucessfully"
             });
      }
       }) 
       });
            //////////////////update password of user////////////
admin.put('/update-user-password/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update user set? where ?",[{password:data.password},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
        //////////////////update phone of user////////////
admin.put('/update-user-phone/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update user set? where ?",[{phone:data.phone},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
        //////////////////update status of user////////////
admin.put('/update-user-status/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update user set? where ?",[{status:data.status},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
        //////////////////update skill of user////////////
admin.put('/update-user-skill/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update user set? where ?",[{skill:data.skill},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
        //////////////////update about you of user////////////
admin.put('/update-user-aboutYou/:id',(req,res)=>{
    const { id }=req.params;
    const data=req.body;
   conn.query("update user set? where ?",[{aboutYou:data.aboutYou},{id:id}],(err,result)=>{
  if (err){
      res.statusCode=500;
      res.send({
          message:"there is error in update"
      });
  }else{
      res.send({
          message:"updated sucessfully"
         });
  }
   }) 
   });
   //////////////delete specific user
admin.delete('/delete-user/:id',(req,res)=>{
    const { id }=req.params;
    conn.query("delete from user where ?",{id:id},(err,result,fields)=>{
      if (err){
          res.statusCode=500;
          res.send({
              message:"there is error in delete"
          });
      } else{
     res.send({
      message:"deleted sucessfully"
     });
    }
   });
  });
  /////////////assignment user///////////////
admin.post('/assign-user',(req, res)=>{
    const data=req.body;
    conn.query("insert into user set ?", {firstName:data.firstName,lastName:data.lastName,email:data.email,password:data.password,phone:data.phone,status:data.status,type:data.type,skill:data.skill,aboutYou:data.aboutYou},(err,result,fields)=>{
        if(err){
            res.send({
                message:"there is error in post values in db"
            })   
        }else{
            res.send({
                message:"user is assigned",
              });
        }
    })
  
   
    });  
    //////////list user///////////////////
    admin.get('/get-user',(req, res)=>{
        conn.query("select * from user",(err,result,fields)=>{
            
            if(err){
                res.send({
                    message:"there is error in get values from db"
                })   
            }else{
                res.send(result);
            }
        })
       
      });
module.exports=admin;