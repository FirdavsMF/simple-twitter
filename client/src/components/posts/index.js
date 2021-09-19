import React from "react";

export default function index({ twits, addLike, deletePost }) {
  const Liked = "https://www.svgrepo.com/show/13686/like.svg",
    UnLiked = " https://www.svgrepo.com/show/13689/like.svg";

  return (
    <>
      <div className="posts_wrapper" key={twits.post_like}>
        <div className="post_text">
          <div className="post__user">
            <img
              src="https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"
              alt="dsdsdc"
            />
            <p>@{twits.user_name}</p>
            <svg
              onClick={() => deletePost(twits.id)}
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-9l7dzd r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
            >
              <g>
                <path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path>
                <path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path>
              </g>
            </svg>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
            >
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </div>
          <span>{twits.post_text}</span>
        </div>
        <div className="post_img">
          <img src={twits.post_img} alt="" />
        </div>
        <div class="post__option">
          <div className="like" onClick={() => addLike(twits.id)}>
            <img src={twits.likedByMe !== 0 ? Liked : UnLiked} alt="like" />
            <span>{twits.post_like}</span>
          </div>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
          >
            <g>
              <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
