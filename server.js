const express = require('express');
const { graphqlHTTP } = require("express-graphql");


const app = express();
const PORT = process.env.PORT || 3002;

const schema = require("./schema")
const routes = require('./routes')



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})
}
else {
  app.use(express.static("public"));
}





app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","http://localhost:3000");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS")
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');

    next()
})


app.use("/graphql", function (req, res, next) {

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });


app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))


app.use(routes)





app.listen(PORT,console.log(`Logged onto port ${PORT}, ${process.env.USER}.PID:${process.pid}.`))