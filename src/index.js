import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import bcrypt, { hash } from "bcrypt";
import cors from "cors";
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT || 3000;
let user = 1;
const saltRound = 10;
let users_data = []; 

const db  = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
  });
  db.connect();
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(bodyParser.json());
  const allowedOrigins = ['https://keepers-note.netlify.app/'];
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

  async function getItems() {
    try{
      const result = await db.query("SELECT * FROM users_data where users_id=$1",[user]);
      return result.rows;

    }
    catch(err){
      console.log("error",err);
    }
    
  }


  //Handling the register request
  app.post("/register", async (req,res)=>{
    //console.log(req.body);

    const {email,password} = req.body;
try{
    const checkMail =  await db.query("SELECT * FROM users WHERE email=$1",[email]);

    if(checkMail.rows.length > 0){
      res.status(404).json({message: "Email exists"});
    }
    else{
      bcrypt.hash(password,saltRound, async (err,hash)=>{

      if(err) console.log("error while hashing",err);

      else{
        const result  = await db.query("INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id;",[email,hash] );
          user= result.rows[0].id;
  
          users_data = await getItems();

          res.json( {data: [{user_id:user}]});

      }
      })
    }
  }catch(err){
    console.log("error",err);
  }
  });



//Handling the login request
  app.post("/login",async(req,res)=>{

    const {email,password}= req.body;

    try{

      const checkMail = await db.query("SELECT * FROM users WHERE email = $1;",[email]);
    //console.log("rows of data recieved",checkMail.rows);
   
    if(checkMail.rows.length > 0){
      const storespass = checkMail.rows[0].password;
      user = checkMail.rows[0].id;
      //console.log("user id after login:",user);
      bcrypt.compare(password,storespass, async (err,result)=>{
        //console.log("Password matched:",result);
        if(err){
            console.log(err);
        }
        if(result){
             users_data = await getItems();
             //console.log("users_data after getting login getItems:",users_data);
        res.json({ data: users_data});
        }
        else{
            res.status(401).json({message: "Wrong Password try again!"});
        }
      });
    }
    else{
        res.status(404).json({message: "Email does not exist"});}

    } catch(err){
      console.log("error", err);
    }

  });





//handling add data request from user
  app.post("/add",async(req,res)=>{
    const {user_data,id} = req.body;
    //console.log(user_data);
    //console.log(id);
    const result = await db.query("INSERT INTO users_data (title,content,users_id) VALUES($1,$2,$3);",[user_data.title,user_data.content,user]);
    users_data = await getItems();
    res.json({data: users_data});

  });


//Handling delete request from user
  app.post("/delete",async(req,res)=>{

    const idToDelete = parseInt(req.body.deleteNoteId);
    //console.log("id to delete ",idToDelete);
    const result = await db.query("DELETE FROM users_data WHERE id=$1;",[idToDelete]);

    users_data = await getItems();
    res.json({data:users_data});

  });



  //handling items request from the user
  app.get("/items",async (req,res)=>{
    user = parseInt(req.query.user);
    //console.log("users_id on add request",user);
    users_data = await getItems();
    res.json({ data: users_data
    });
  });






  app.listen(port,()=>{
    console.log("running on 3000");
  })