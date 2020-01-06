import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from "axios";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[0-9]*$/;

const useStyles = makeStyles(theme => ({
  login_register_button: {
      position: 'fixed',
	  right: '5%',
	  top: '5%',
	  float: 'right'  
  },
  login_register_box_container: {
	  width: 600,
	  height: 560,
	  position: 'fixed',
	  top: '20%',
	  left: '35%',
	  overflow: 'hidden',
	  backgroundColor: 'white',
  },
  login_register_box: {
	  width: 530,
	  height: 400,
	  margin: '10px 0 0 60px',
	  float: 'left',
  },
  login_register_inner_container: {
	  width: 2000,
	  height: 500,
	  overflow: 'hidden',
	  transition: '1s',
  },
  input_field: {
	  display: 'block',
	  margin: '20px 0 0 0',
	  width: '70%',
  },
}));

export default function Login_Reg_Button({onLoginRegister}) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newUsername, setNewUsername] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');

  
  const display_box = () => {
	  setOpen(!open);
  };
  
  const hide_box = () => {
	  setOpen(false);
	  setUsername('');
	  setPassword('');
	  setNewPassword('');
	  setNewUsername('');
	  setEmail('');
	  setPhone('');
  };
  
  var state;
  const login = {
	  margin: '0 0 0 0',
  };
  const register = {
	  margin: '0 0 0 -600px',
  };
  
  if(isLogin) {
	  state = login;
  } else {
	  state = register;
  }
  
  const jump = () => {
      setIsLogin(!isLogin);
  };

  function validateLogin() {
      return (username!=='' && password!=='');
  }

  function validateRegister() {
      return (newUsername!=='' && newPassword!=='' && emailRegex.test(email) && phoneRegex.test(phone));
  }

  async function submitLogin() {
      await axios.post(
          'http://localhost:8000/api/user/auth/',
          {username: username, password: password},
          {headers: {'Content-Type': 'application/json'}}
      ).then( (response) => {
          onLoginRegister(username, password);
          hide_box();
      }).catch( (error) => {
          if (error.response) {
              alert(error.response.status + ' request failed: ' + error.response.data);
          } else {
              alert('Request failed: ' + error.message);
          }
      });
  }

  async function submitRegister() {
      await axios.post(
          'http://localhost:8000/api/user/create/',
          {username: newUsername, password: newPassword, email: email, phone: phone},
          {headers: {'Content-Type': 'application/json'}}
      ).then( (response) => {
          onLoginRegister(newUsername, newPassword);
          hide_box();
      }).catch( (error) => {
          if (error.response) {
              alert(error.response.status + ' request failed: ' + error.response.data);
          } else {
              alert('Request failed: ' + error.message);
          }
      });
  }

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.login_register_button} onClick={display_box}>
        Login/Register
      </Button>
	  {open? (
	    <Paper className={classes.login_register_box_container}>
		  <CloseIcon style={{ fontSize: 40, cursor: 'pointer', float: 'right', color: 'grey'}} onClick={hide_box}/>
		  <div className={classes.login_register_inner_container} style={state}>
		  <form className={classes.login_register_box}>
			<Typography variant="h4" gutterBottom>
			Login
			</Typography>
			<TextField id="login_username" fullWidth variant="outlined" label="Username" className={classes.input_field}
                       value={username} onChange={e => setUsername(e.target.value)}/>
			<TextField id="login_password" fullWidth variant="outlined" label="Password" className={classes.input_field}
                       type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
			<Button variant="contained" color="primary" style={{height: '50px',width: '70%', margin: '40px 0 10px 0'}} disabled={!validateLogin()}
                    onClick={() =>submitLogin()}>
			Login
			</Button>
			<Typography variant="subtitle1" gutterBottom style={{color: 'blue', cursor: 'pointer'}} onClick={jump}>
			Register
			</Typography>
		  </form>
		  <form className={classes.login_register_box}>
			<Typography variant="h4" gutterBottom>
			Register
			</Typography>
			<TextField id="register_username" fullWidth variant="outlined" label="NewUsername" className={classes.input_field}
                       value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
			<TextField id="register_password" fullWidth variant="outlined" label="NewPassword" className={classes.input_field}
                       type={"password"} value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
			<TextField id="register_email" fullWidth variant="outlined" label="Email" className={classes.input_field}
                       value={email} onChange={e => setEmail(e.target.value)}/>
			<TextField id="phone" fullWidth variant="outlined" label="Phone" className={classes.input_field}
                       value={phone} onChange={e => setPhone(e.target.value)}/>
			<Button variant="contained" color="secondary" style={{height: '50px',width: '70%', margin: '40px 0 10px 0'}} disabled={!validateRegister()}
                    onClick={() => submitRegister()}>
			Register
			</Button>
			<Typography variant="subtitle1" gutterBottom style={{color: 'blue', cursor: 'pointer'}} onClick={jump}>
			Back
			</Typography>
		  </form>
		  </div>
		</Paper>
	  ): null}
    </div>
  );
};