import express from 'express';
import path from 'path';

const root = path.resolve(__dirname, '../');

// application server
const app = express();

app.use('/dist', express.static(`${root}/dist`));

app.get(/^.*$/, function (req, res) {
  res.sendFile(`${root}/dist/index.html`);
});

app.listen(3000, function () {
  console.log('App Server running on port 3000');
});
