const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 3500;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    // user: "root",
    // host: "localhost:27015",
    // password: "",
    // database: "employeeSystem",
    host: "localhost",
    user: "root",
    database: "employeeSystem",
    password: "root"
});


// app.post("/create", (req, res) => {
//     const post_text = req.body.post_text;
//     const post_img = req.body.post_img;
//     // const avatar = req.body.avatar;

//     db.query(
//         "INSERT INTO posts (post_text, post_img) VALUES (?,?)", [post_text, post_img],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send("Values Inserted");
//             }
//         }
//     );
// });

app.post("/api/posts/add", function(req, res) {
    var params = req.body;

    const imageFile = req.files.post_image;
    imageFile.mv(path.join(__dirname + "/uploads/") + imageFile.name, (err) => {
        if (err) {
            console.log("Ошибка при загрузка файла", err);
        }
    });
    const post = {
        user_id: params.userId,
        user_name: params.username,
        post_text: params.post_text,
        post_image: imageFile.name,
        post_like: Number(0),
    };
    connection.query(
        "INSERT INTO posts (user_id , user_name, post_text , post_img, post_like) VALUE (? ,? , ? , ?, ?)", [
            post.user_id,
            post.user_name,
            post.post_text,
            post.post_img,
            post.post_like,
        ],
        function(error, results) {
            if (error) throw error;
            res.json("done");
        }
    );
});

// app.get("/posts", (req, res) => {
//     const post_text = req.body.post_text;
//     const post_img = req.body.post_img;
//     const post_like = req.body.post_like;

//     db.query(
//         "SELECT * FROM posts", [post_text, post_img, post_like],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send(result);
//             }
//         }
//     );
// });

app.get("/api/posts", (req, res) => {
    db.query("SELECT * FROM users", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.put("/api/posts/:id ", (req, res) => {
    const id = req.body.id;
    const post_text = req.body.post_text;
    db.query(
        "UPDATE posts SET post_text = ? WHERE id = ?", [post_text, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
// app.listen(3500, () => {
//     console.log("Yey, your server is running on port 3500");
// });`Example app listening at http://localhost:${port}`