const router = require('express').Router();
const pool = require("./pg/pool.js")



router.get("/test",(req,res)=>{
    res.json({msg:"connected to back-end"})
})


router.post("/register",async(req,res)=>{
    console.log(req.body);
    let { username,password,email,age,gender,interestedIn } = req.body;
    let dbclient = await pool.query("INSERT INTO member (username,password,age,email,gender,interestedIn) VALUES ($1,$2,$3,$4,$5,$6)",[username,password,age,email,gender,interestedIn])
    console.log(dbclient)
    res.json({msg:"registerInfo received"})
})


router.post('/login',async (req,res)=>{
    console.log(req.body);
    let dbclient = await pool.query("SELECT * FROM member WHERE username = ($1)",[req.body.username]);

    if(!dbclient.rows.length){
        console.log("no member of that name!");
        res.status(401).json({msg:"invalid username!"})
    }
    else if(dbclient.rows[0].password !== req.body.password){
        res.status(403).json({msg:"Invalid password"})
    }

  
        
    else{
        console.log("looks good!")
        console.log(dbclient.rows[0]);
        res.status(200).json({msg:`Welcome back ${dbclient.rows[0].username}, redirecting you now!`})
    }
    console.log(dbclient.rows[0])
})



router.get("/userinfo/:user",async(req,res)=>{
    console.log("/userinfo fired")
        let username = req.params.user[0].toLowerCase() + req.params.user.split("").splice(1,req.params.user.length-1).join("")
    let dbuser = await pool.query("SELECT * FROM member WHERE username=($1)",[username]);
        console.log("YOURUSER:",dbuser.rows[0])
    res.json(dbuser.rows[0])
})


module.exports = router;