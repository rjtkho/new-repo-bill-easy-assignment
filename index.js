const client = require("./connection.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Sever is now listening at port 3000");
});

client.connect();

app.post("/insertEmpoyee", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into employee(emp_id,name, email,hiredate,salary,dept_id) 
                       values(${user.emp_id}, '${user.name}', '${user.email}','${user.hiredate}','${user.salary}','${user.dept_id}')`;
  console.log(insertQuery);
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.post("/insertDepartment", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into department(dept_id,dept_name) 
                       values('${user.dept_id}', '${user.dept_name}')`;
  console.log(insertQuery);
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

app.get("/getAllEmployee", async (req, res) => {
  const query = `SELECT COUNT(*) AS "number of employee" FROM "employee"`;
  try {
    const { rows } = await client.query(query);
    res.status(200).json(rows);
    console.log(rows);
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end();
  }
});

app.get("/hireDate", async (req, res) => {
  let data = req.body;
  const query = `SELECT * 
                   FROM "employee" 
                   JOIN "department" ON "department"."dept_id" = "employee"."dept_id" WHERE ${
                     (data.hiredate, "true")
                   }`;
  console.log(query);
  try {
    const { rows } = await client.query(query);
    res.status(200).json(rows);
    console.table(rows);
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end();
  }
});
