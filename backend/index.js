const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

const allowedOrigins = ["*"];

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log(process.env.test);
const pool = mysql.createPool({
  database: `fintech`,
  user: `admin`,
  host: "fintech.chc48k60w3sf.af-south-1.rds.amazonaws.com", //this is used when testing locally
  password: `huambo#1995`,
  connectTimeout: 10 * 1000,
});

//FETCH ALL
app.get("/employees", (request, response) => {
  pool
    .query(`SELECT * FROM Employee`)
    .then((r) => {
      response.send(r[0]);
    })
    .catch(() => {
      response.send({
        error: "Failed to retrieve",
      });
    });
});

//CREATE
app.post("/employees", (request, response) => {
  const empObj = request.body;
  const firstName = empObj["firstName"];
  const lastName = empObj["lastName"];
  const email = empObj["email"];
  const employmentType = empObj["employmentType"];

  pool
    .execute(
      `INSERT INTO Employee(firstName,lastName,email,employmentType) VALUES('${firstName}','${lastName}','${email}','${employmentType}')`
    )
    .then((r) => {})
    .catch((e) => {
      response.send({
        error: "Failed to CREATE",
      });
    });
});

//FETCH EMPLOYEE
app.get("/employee/:uid", (request, response) => {
  const empUID = request.params.uid;

  pool
    .query(`SELECT * FROM Employee Where Employee.id = '${empUID}'`)
    .then((r) => {
      response.send(r[0]);
    })
    .catch(() => {
      response.send({
        error: "Failed to FETCH",
      });
    });
});

//DELETE
app.delete("/employee/:uid", (request, response) => {
  const empUID = request.params.uid;

  pool
    .execute(`DELETE FROM Employee WHERE Employee.id = '${empUID}'`)
    .then((results) => {
      response.send({
        result: results[0],
      });
    })
    .catch((e) => {
      response.send({
        error: "Failed to delete",
      });
    });
});

app.put("/employee", (request, response) => {
  const empObj = request.body;
  const uid = empObj["id"];
  const firstName = empObj["firstName"];
  const lastName = empObj["lastName"];
  const email = empObj["email"];
  const employmentType = empObj["employmentType"];

  pool
    .execute(
      `UPDATE Employee SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', employmentType = '${employmentType}' WHERE id = '${uid}'`
    )
    .then((results) => {
      response.send({
        result: results[0],
      });
    })
    .catch((e) => {
      response.send({
        error: "Failed to delete",
      });
    });
});

app.get("/", (request, response) => {
  response.send({
    status: "Functional",
    for: "Mobiz",
  });
});

app.listen(8080, () => {
  console.log("Listening");
});
