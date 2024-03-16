import React from "react";
import "./profile.css";
import Logo from "../Home/Logo.png";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

function Profile() {
  const navigate= useNavigate();
  const handleBack=()=>{
navigate('/login-home')
  }

  return (
    <>
      <div className="logo2">
        <img src={Logo} alt="logo" />
        <div id="text2">
        <h3 className="text2" id="header">
          TouchUi
        </h3>
        </div>
      </div>

      <div className="cards">
        <div className="content">
          <div className="back">
            <div className="back-content">
              <svg
                stroke="#ffffff"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                height="50px"
                width="50px"
                fill="#ffffff"
              ></svg>

              <img
                src="https://wallpapercave.com/wp/wp10543824.jpg"
                alt="profile"
                id="cardProfile"
              />
              <h4 className="un">Jack@13k</h4>
              <p className="n">Jack</p>
              <p className="bio">
                Travel Photographer and interested in adventure activities.
                <br />
                <br />
                Adhvan 🦅 and Nyctophile ⋆⁺₊⋆ ☾⋆⁺₊⋆
              </p>
            </div>
          </div>

          <div className="front">
            <div className="back-button">
            <IoChevronBackCircleOutline id="back" onClick={handleBack}/>
            </div>
            <div className="img">
              <div className="circle"></div>
              <div className="circle" id="right"></div>
              <div className="circle" id="bottom"></div>
            </div>
            <div className="front-content">
              <small className="badge">Profile Info</small>
              <div className="description">
                <div className="title">
                  <p className="title">
                    <b>Followers : 0 </b>
                  </p>
                  <p className="title">
                    <b>Following : 0</b>
                  </p>
                  <svg
                    fillRule="nonzero"
                    height="15px"
                    width="15px"
                    viewBox="0,0,256,256"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                  ></svg>
                </div>
                <p className="card-footer">30 days &nbsp; | &nbsp; 4 post</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
