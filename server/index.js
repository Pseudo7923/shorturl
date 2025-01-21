const express = require("express");
const cors = require("cors");
const mysql = require("mysql2"); // Use mysql2 for async/await support
const dotenv = require("dotenv");
const app = express();
const {v4:uuidv4} = require('uuid')
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Remote connection setup using mysql2 (supports async/await)
const con = mysql.createConnection({
  host: process.env.HOST_NAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Database connection using async/await (mysql2 supports promises)
async function connectDB() {
  try {
    await con.promise().connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

connectDB();

// UUID generator
function generateShortUUID() {
  const fullUUID = uuidv4();  // Generate a full UUID
  return fullUUID.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);  // Clean and shorten it to 6 characters
}


app.post("/api/create-short-url", async (request, response) => {
  // let uniqueID = Math.random()
  //   .toString(36)
  //   .replace(/[^a-z0-9]/gi, "")
  //   .substr(2, 10);

  let uniqueID = generateShortUUID()

  let sql = `INSERT INTO links(longurl,shorturlid) VALUES(?, ?)`;
  try {
    const [result] = await con.promise().query(sql, [request.body.longurl, uniqueID]);
    response.status(200).json({
      status: "ok",
      shorturlid: uniqueID,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: "notok",
      message: "Something went wrong",
    });
  }
});

app.get("/api/get-all-short-urls", async (request, response) => {
  let sql = `SELECT * FROM links`;
  try {
    const [result] = await con.promise().query(sql);
    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: "notok",
      message: "Something went wrong",
    });
  }
});

app.get("/:shorturlid", async (request, response) => {
  let shorturlid = request.params.shorturlid;
  let sql = `SELECT * FROM links WHERE shorturlid=? LIMIT 1`;

  try {
    const [result] = await con.promise().query(sql, [shorturlid]);
    if (result.length > 0) {
      let updateSql = `UPDATE links SET count = count + 1 WHERE id = ? LIMIT 1`;
      await con.promise().query(updateSql, [result[0].id]);

      response.redirect(result[0].longurl);
    } else {
      response.status(404).json({
        status: "notok",
        message: "Short URL not found",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: "notok",
      message: "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log("app running on port", PORT);
});
