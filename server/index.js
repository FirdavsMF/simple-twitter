const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mysql = require("mysql");
const port = 8010;
const path = require("path");

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

// добавление пост
app.post("/api/post/add", function (req, res) {
  const params = req.body;
  const image = req.files.post_image;

  image.mv(path.join(__dirname + "/uploads/") + image.name, (err) => {
    if (err) {
      console.log("Ошибка при загрузка файла", err);
    }
  });

  const post = {
    user_id: params.user_id,
    user_name: params.user_name,
    post_text: params.post_text,
    post_img: `http://localhost:${port}/api/post/image/${image.name}`,
    post_like: 0,
    likedByMe: 0,
  };

  connection.query(
    "INSERT INTO posts (user_id , user_name, post_text , post_img, post_like, likedByMe) VALUE (? ,? , ? , ?, ?, ?)",
    [
      post.user_id,
      post.user_name,
      post.post_text,
      post.post_img,
      post.post_like,
      post.likedByMe,
    ],
    function (error, results) {
      if (error) throw error;
      res.json({ data: post });
    }
  );
});

// получение пости
app.get("/api/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// получение картинки
app.get("/api/post/image/:img", (req, res) => {
  const idPost = req.params.img;
  res.sendFile(path.join(__dirname + `/uploads/${idPost}`));
});

// изменение поста по id
app.put("/api/post/edit/:id", (req, res) => {
  const params = req.body;
  const idPost = req.params.id;
  const image = req.files.post_image;
  image.mv(path.join(__dirname + "/uploads/") + image.name, (err) => {
    if (err) {
      console.log("Ошибка при загрузка файла", err);
    }
  });

  const queryUpdate = "UPDATE posts SET post_text = ?, post_img =?  WHERE id=?";
  connection.query(
    queryUpdate,
    [
      params.post_text,
      `http://localhost:${port}/api/post/image/${image.name}`,
      idPost,
    ],
    function (error, results) {
      if (error) throw error;
      res.json("обновление выполнено");
    }
  );
});

// удаление поста
app.delete("/api/post/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("удаление выполнено");
    }
  });
});

// запускаем сервер в порт 8010
app.listen(port, () => {
  console.log(`sever zapushen v  http://localhost:${port || 8011}`);
});
