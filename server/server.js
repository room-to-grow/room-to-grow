const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// if in production

// serving static file index.html on the route '/':
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});


// global error handler:
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errObj = Object.assign({}, defaultErr, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
});

// listener:
app.listen(3000, () => {console.log(' PORT 3000 listening...')}); 