import * as React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Nav_bar = styled.div`
  height: 15vh;
  margin: 30px;
  padding-left: 30px;
  display: grid;
  grid-template-columns: 180px auto 100px 200px;
  background-color: grey;
`;

const Logo = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-align: -webkit-center;
  align-self: center;
`;

const Profileimg = styled.div`
  text-align: -webkit-center;
`;

const Profile = styled.div`
  align-self: center;
`;

const Memberfunc = styled.div`
  font-size: 20px;
  font-weight: bold;
  align-self: center;
`;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = styled.div`
  height: 50px;
  justify-content: center;
  background: lightgrey;
  font-weight: bold;
  font-size: 23px;
  display: flex;
  align-items: center;
`;

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Nav_bar>
        <Logo>
          <a>PROMA</a>
        </Logo>
        <div></div>
        <Profile>
          <Profileimg>
            <img style={{width: "50%"}} src="/profileimg.png"/>
          </Profileimg>
        </Profile>
        <Memberfunc>
          <a onClick={handleOpen}>로그인 / 회원가입</a>
        </Memberfunc>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Login>
              Github
            </Login>
          </Box>
        </Modal>
      </Nav_bar>
    </>
  );
};

export default NavBar;
