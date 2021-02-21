const Pool = require("pg").Pool;



const pool = new Pool({
    database:"tinderreactdb",
    password:"",
    user:"",
    port:5432,
    host:'127.0.0.1'
})



pool.connect(()=>{
    console.log("pg is connected")
})


module.exports = pool;