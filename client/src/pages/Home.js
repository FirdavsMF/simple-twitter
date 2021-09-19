import React, { useState, useEffect } from "react";
import "./styles/Home.css";
import FormData from "form-data";
import Posts from "../components/posts";
import AddPost from "../components/addPost";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8010/api/posts")
      .then((res) => setPosts(res.data));
  }, []);

  const handleAddLike = (id) => {
    setPosts((prevState) =>
      prevState.map((o) => {
        if (o.id !== id) {
          return o;
        }

        const likedByMe = o.likedByMe === 0 ? 1 : 0;
        const post_like = o.likedByMe === 0 ? o.post_like + 1 : o.post_like - 1;
        return { ...o, likedByMe, post_like };
      })
    );
  };

  const addPost = (el) => {
    const data = new FormData();
    data.append("user_id", 12);
    data.append("user_name", "Muhammad");
    data.append("post_text", el.text);
    data.append("post_image", el.image);

    axios.post("http://localhost:8010/api/post/add", data).then((res) => {
      setPosts((prevState) => [res.data, ...prevState]);
    });
  };

  const deletePost = (id) => {
    const arr = posts.filter((item) => item.id !== id);
    setPosts(arr);
    axios.delete(`http://localhost:8010/api/post/delete/${id}`);
  };

  return (
    <>
      <div className="home__section">
        <div className="container_twitter">
          <div className="twit">
            <AddPost addPost={addPost} />
            <div className="posts">
              {posts?.map((el) => {
                return (
                  <Posts
                    twits={el}
                    deletePost={deletePost}
                    addLike={handleAddLike}
                    key={el.like}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
