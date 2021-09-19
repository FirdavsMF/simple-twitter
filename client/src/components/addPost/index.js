import React, { useState } from "react";

export default function Index({ addPost }) {
  const [state, setstate] = useState({
    text: null,
    image: null,
  });

  return (
    <>
      <div className="add_twit">
        <div className="add_twit_input">
          <input
            type="text"
            onChange={(e) => setstate({ ...state, text: e.target.value })}
            placeholder="Что твориться ?"
          />
        </div>
        <div className="wrapper">
          <input
            type="file"
            onChange={(e) => setstate({ ...state, image: e.target.files[0] })}
          />
          <button onClick={() => addPost(state)}>Твитнуть</button>
        </div>
      </div>
    </>
  );
}
