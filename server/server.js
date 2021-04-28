const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 7070;




// // SESSION CONTROL
// const session = require("express-session");
// const pg = require("pg");
// const pgSession = require("connect-pg-simple")(session);

// app.use(
//   session({
//     store: new pgSession({
//       pool: db, // our pool
//       tableName: "user_sessions",
//     }),
//     secret: randomString.generate({
//       length: 14,
//       charset: "alphanumeric",
//     }),
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
//   })
// ); 



//
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/build", express.static(path.join(__dirname, "../build")));



app.use((req, res, next) => {
  console.log(`
  ***** FLOW TEST *****\n
  METHOD: ${req.method}\n
  URL: ${req.url}\n`);
  return next();
});



// serving static file index.html on the route '/':
//needs to send login page info
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

// route handlers go here
const location = require("./routes/locationRouter");
app.use("/location", location);

const signup = require("./routes/dbRouter");
app.use("/signup", signup);

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
