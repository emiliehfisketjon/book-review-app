const express = require("express");
//use node and express server as an API.
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001;
const multer = require("multer"); //multer: package able to parse incoming bodies (foreign data bodies)
app.use(express.static("uploads"));
app.use(express.static("stars"));

//using multer: source: https://www.youtube.com/watch?v=srPXMt1Q0nY
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const { validPassword, hashPassword } = require("./PasswordHandler");

app.use(cors()); //allows us to make connections between two servers
app.use(express.json()); // be able to recieve json in the backend

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "UserDatabase",
});

app.post("/adduser", (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  const { salt, hash } = hashPassword(password);

  db.query(
    "INSERT INTO users (email, firstname, lastname, salt, hash) VALUES (?,?,?,?,?)",
    [email, firstname, lastname, salt, hash],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.send({ correct: true, email: email });
      }
    }
  );
});

app.post("/checkuser", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT salt, hash FROM `users` WHERE `email`=?",
    [email],
    (error, result) => {
      if (error) {
        throw error;
      } else if (result.length == 0) {
        console.log("User does not exist");
        res.sendStatus(404);
      } else {
        const { salt, hash } = result[0];

        if (!validPassword(salt, password, hash)) {
          res.send({ message: "Wrong email/password combination" });
        } else {
          res.send({ correct: true, email: email });
        }
      }
    }
  );
});

app.post("/addreview", upload.single("book_cover"), (req, res) => {
  const { email, title, author, review, stars, date, filename } = req.body;

  db.query(
    "INSERT INTO books (email, title, author, review, stars, date, filename) VALUES (?,?,?,?,?,?,?)",
    [email, title, author, review, stars, date, filename],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.send({ correct: true, email: email });
      }
    }
  );
});

app.post("/reviews", (req, res) => {
  const { email } = req.body;
  db.query(
    "SELECT * FROM `books` WHERE `email`=?",
    [email],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.send({ data: result });
      }
    }
  );
});

app.post("/edit", (req, res) => {
  const { id, title, author, review, stars, date } = req.body;

 

  db.query(
    "UPDATE books SET `title` = ?, `author` = ?, `review` = ?, `stars` = ? WHERE (`id_user` = ?);", 
    [title, author, review, stars, date, id],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        res.send({ correct: true });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
