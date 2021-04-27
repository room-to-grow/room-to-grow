const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = 3000;

//
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use("/build", express.static(path.resolve(__dirname, "../build")));

// serving static file index.html on the route '/':
//needs to send login page info
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

// route handlers go here
const location = require("./routes/locationRouter");
app.use("/location", location);

const signup = require("./routes/dbRouter");
app.use("/signup", signup);

// app.post('/signup',(req,res)=>{
//   console.log('HEEEEELLLLOOOO')
// })

// const faves = require('./routes/dbRouter')
// app.use('/user', faves);

// unknown path handler
app.get("*", function (req, res) {
  res.status(404).send("Whoops, something isn't quite right....");
});

// global error handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    log:
      "globalDefaultErr: Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(err);
  return res.status(errObj.status).json(errObj.message);
});

// listener:
app.listen(PORT, () => {
  console.log(`Connected, listening on port ${PORT}`);
});