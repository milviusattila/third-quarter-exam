/*


**************************************
**************************************
**                                  **
**     DO NOT CHANGE THIS FILE!     **
**                                  **
**************************************
**************************************


*/


const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/../frontend/index.html`)));
app.use('/public', express.static(path.join(`${__dirname}/../frontend/static`)));

app.get('/api/data', (req, res) => res.sendFile(path.join(`${__dirname}/data.json`)));

app.post('/api/data/new', (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.pets) return res.status(400).json("some data are missing!");

  if (typeof req.body.age !== 'number') return res.status(400).json("age should be number!");

  fs.readFile(`${__dirname}/data.json`, 'utf8', (err, data) => {
    if (err) {
      console.log("error at reading file: ", err);
      res.status(500).json("error at reading file");
    } else {
      const fileData = JSON.parse(data);

      const newData = {
        id: [...fileData].sort((a, b) => b.id - a.id)[0].id + 1,
        ...req.body
      };
      console.log(newData);

      fileData.push(newData);

      fs.writeFile(`${__dirname}/data.json`, JSON.stringify(fileData, null, 2), () => {
        res.json(`new data has beed added with id: ${newData.id}`);
      });
    }
  });
})

app.listen(3000, () => console.log("server is running at: http://127.0.0.1:3000"));