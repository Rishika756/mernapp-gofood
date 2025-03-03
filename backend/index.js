const express = require('express');
const connectDB = require('./db'); 
const app = express();
const port = 5001;
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://localhost:3000")
  res.header(
    "Access-Control-Allow-Header",
    "Origin,X-Requested-With, Content-Type,Accept"
  );
  next();
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});