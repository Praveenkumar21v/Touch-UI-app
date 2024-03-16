import React, { useState } from "react";
import "./Post.css";
import cover1 from "./Lion.jpg";
import cover2 from './Wolf.jpg';
import cover3 from './636768.jpg';
import cover4 from './sun photography.webp'
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";

const PostCard = () => {
  const [posts, setPosts] = useState([
    { id: 1, liked: false, showCommentBox: false, isPostDeleted: false, imageSrc: cover1 },
    { id: 2, liked: false, showCommentBox: false, isPostDeleted: false, imageSrc: cover2 },
    { id: 3, liked: false, showCommentBox: false, isPostDeleted: false, imageSrc: cover3 },
    { id: 4, liked: false, showCommentBox: false, isPostDeleted: false, imageSrc: cover4 }

  ]);

  const handleLikeClick = (postId) => {
    setPosts((prevState) =>
      prevState.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const handleCommentClick = (postId) => {
    setPosts((prevState) =>
      prevState.map((post) =>
        post.id === postId ? { ...post, showCommentBox: !post.showCommentBox } : post
      )
    );
  };

  const handleOptionsClick = (postId) => {
    setPosts((prevState) =>
      prevState.map((post) =>
        post.id === postId ? { ...post, showOptions: !post.showOptions } : post
      )
    );
  };

  const handleDeletePost = (postId) => {
    setPosts((prevState) =>
      prevState.map((post) =>
        post.id === postId ? { ...post, isPostDeleted: true } : post
      )
    );
  };

  return (
    <section className="main">
      <div className="wrapper">
        <div className="left-col">
          {posts.map((post) => (
            !post.isPostDeleted && (
              <div className="post" key={post.id}>
                <div className="info">
                  <div className="user">
                    <div className="profile-pic">
                      <img id="profilepic" src={post.imageSrc} alt="" />
                    </div>
                    <p className="username">modern_web_channel</p>
                  </div>
                  <div className="options" onClick={() => handleOptionsClick(post.id)}>
                    <SlOptions id="options" />
                    {post.showOptions && (
                      <div className="options-menu">
                        <p onClick={() => handleDeletePost(post.id)}>Delete Post</p>
                        <p>Edit Post</p>
                      </div>
                    )}
                  </div>
                </div>
                <img src={post.imageSrc} className="post-image" alt="" />
                <div className="post-content">
                  <div className="reaction-wrapper">
                    {post.liked ? (
                      <FaHeart
                        id="heart"
                        style={{ color: "rgb(185, 4, 4)" }}
                        onClick={() => handleLikeClick(post.id)}
                      />
                    ) : (
                      <FaRegHeart id="heart" onClick={() => handleLikeClick(post.id)} />
                    )}
                    <FaRegComment id="comment" onClick={() => handleCommentClick(post.id)} />
                  </div>
                  <p className="likes">2,024 likes</p>
                  <p className="descriptions">
                    <span className="user">username</span> Lorem ipsum dolor sit
                    amet consectetur, adipisicing elit. Pariatur tenetur veritatis
                    placeat, molestiae impedit aut provident eum quo natus
                    molestias?
                  </p>
                  <p className="post-time">2 days ago</p>
                </div>
                {post.showCommentBox && (
                  <div className="comment-wrapper">
                    <GoSmiley id="smile" />
                    <input
                      type="text"
                      className="comment-box"
                      placeholder="  Add a comment"
                    />
                    <button className="comment-btn">
                      <PiPaperPlaneRightBold />
                    </button>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostCard;
