import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../Home/Logo.png';
import './LoginHome.css';
import { Modal, Button } from 'react-bootstrap';
import { HiHome } from "react-icons/hi2";
import { PiMonitorPlayFill } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaVideo } from 'react-icons/fa';
import PostCard from '../Post/Post';
import { Link, useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';

function LoginHome() {
  const navigate = useNavigate();

  const [isSearchIconVisible, setSearchIconVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [stream, setStream] = useState(null);
  const [isCameraOpened, setCameraOpened] = useState(false);

  const handleSearchClick = () => {
    setSearchIconVisible(false);
  };

  const handleSearchFocus = () => {
    setSearchIconVisible(false);
  };

  const handleSearchBlur = () => {
    setSearchIconVisible(true);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraOpened(false);
  };

  const handleOpenCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setCameraOpened(true);

      const videoElement = document.getElementById('cameraPreview');
      if (videoElement) {
        videoElement.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleChooseFile = (event) => {
    console.log('Choose File', event.target.files[0]);
  };

  const handlePost = () => {
    console.log('Post');
    handleCloseModal();
  };

  const handleCreatePostClick = () => {
    handleOpenModal();
  };

  const handleCapturePhoto = () => {
    console.log('Capturing photo...');
  };

  const handleRecordVideo = () => {
    console.log('Recording video...');
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-dark">
        <Container fluid>
          <Navbar.Brand href="#">
            <img id='LoginLogo' src={Logo} alt="logo" />
            <div id='t1'>
              <h3 className="text-center top" id="header">
                TouchUi
              </h3>
            </div>

            <Form>
              <Form.Control
                type="search"
                placeholder="       Search Touch UI"
                className="search"
                aria-label="Search"
                onClick={handleSearchClick}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                style={{ boxShadow: 'none', outline: 'none', backgroundColor: 'rgb(60, 59, 59)', color: 'rgb(214, 205, 205)' }}
              />
              {isSearchIconVisible && <IoSearchSharp id='search' className="search-icon" />}
            </Form>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" className="custom-toggle" />
          <Navbar.Collapse id="navbarScroll">



            <Nav className="me-auto my-2 my-lg-0 navbarScroll" navbarScroll>
              <Nav.Link href="#home" className="nav-icon" ><HiHome id='home' /></Nav.Link>
              <Nav.Link href="#Media" className="nav-icon"><PiMonitorPlayFill id='play' /></Nav.Link>
              <Nav.Link href="#friends" className="nav-icon"><FaUserFriends id='friends' /></Nav.Link>
              <Nav.Link href="#notifications" className="nav-icon"><FaBell id='notifications' /></Nav.Link>
            </Nav>
            <NavDropdown title={<FaUserCircle id='user' />} id="navbarScrollingDropdown" className="custom-dropdown">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="wrapper">
        <aside className="sidebar">
          <div className="sidebar-item" onClick={handleCreatePostClick}>
            <p>Create Post</p>
          </div>
          <div className="sidebar-item">
            <p>Get Feed</p>
          </div>
        </aside>
        <Modal show={showModal} onHide={handleCloseModal} className='modal'>
          <Modal.Header closeButton className="modal-header">
            <Modal.Title className="modal-title">Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <button onClick={handleOpenCamera}>
              <FaCamera className="camera-icon" /> Open Camera
            </button>
            <video id="cameraPreview" autoPlay playsInline />

            {isCameraOpened && (
              <div className="camera-options" style={{ marginTop: '10px' }}>
                <div className="camera-buttons-container">
                  <button onClick={handleCapturePhoto}>
                    <FaCamera className="camera-icon" /> Capture Photo
                  </button>
                  <button onClick={handleRecordVideo}>
                    <FaVideo className="camera-icon" /> Record Video
                  </button>
                </div>
              </div>
            )}
            <input type="file" accept="image/*,video/*" onChange={handleChooseFile} />
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button id='b1' onClick={handleCloseModal}>
              Close
            </Button>
            <Button id='b2' onClick={handlePost}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
        <PostCard />
      </div>

      <Offcanvas /> 
          </>
  );
}

export default LoginHome;
