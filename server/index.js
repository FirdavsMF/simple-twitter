const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mysql = require("mysql");

// порт
const port = 8010;
const path = require("path");
// имортируем для получение в формате json
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// подкулючение к база данных
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "twitter",
});

// добавление пост к база данных
app.post("/api/post/add", function (req, res) {
  const params = req.body;

  const imageFile = req.files.post_image;
  imageFile.mv(path.join(__dirname + "/uploads/") + imageFile.name, (err) => {
    if (err) {
      console.log("Ошибка при загрузка файла", err);
    }
  });
  const post = {
    user_id: params.user_id,
    user_name: params.username,
    post_text: params.post_text,
    post_img: imageFile.name,
    post_like: Number(0),
  };
  connection.query(
    "INSERT INTO posts (user_id , user_name, post_text , post_img, post_like) VALUE (? ,? , ? , ?, ?)",
    [
      post.user_id,
      post.user_name,
      post.post_text,
      post.post_img,
      post.post_like,
    ],
    function (error, results) {
      if (error) throw error;
      res.json("done");
    }
  );
});

// получение пости из База данных
app.get("/api/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

// изменение поста по id
app.put("/api/post/edit/:id", (req, res) => {
  const params = req.body;
  const idPost = req.params.id;
  const imageFile = req.files.post_image;

  imageFile.mv(path.join(__dirname + "/uploads/") + imageFile.name, (err) => {
    if (err) {
      console.log("Ошибка при загрузка файла", err);
    }
  });

  const post = {
    post_text: params.post_text,
    post_img: imageFile.name,
  };

  const queryUpdate = "UPDATE posts SET post_text = ?, post_img =?  WHERE id=?";
  connection.query(
    queryUpdate,
    [post.post_text, post.post_img, idPost],
    function (error, results) {
      if (error) throw error;
      res.json("update done");
    }
  );
});

app.delete("/api/post/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("deleet done");
    }
  });
});

// запускаем сервер в порт 8010
app.listen(port, () => {
  console.log(`sever zapushen v  http://localhost:${port}`);
});
