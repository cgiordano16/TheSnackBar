import React from 'react'
import Button from '@material-ui/core/Button'
import {Redirect, useHistory} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


export function User_Buttons(){
    const [open, setOpen] = React.useState(false);
    let history = useHistory();
  
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = e =>{
      //console.log(e.target)
      const {id, value} = e.target
      setValues({...values, [id]: value})
    }
    
   
    const addItem = () => {
      const {username, password} = values
      console.log(values)
      if(!username || !password) return
      const str_body = JSON.stringify(values);
      fetch('http://localhost:9000/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: str_body
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success: ', result);
        history.push('/catalog');
        
      })
      .catch(error => {
        console.error('Error: ', error)
      });
    }

    const [values, setValues] = React.useState({username: '', password: ''})

    return(
      <>
        <div className = "login_button_container">       
            <Button onClick={handleClickOpen} color="default" variant = "contained" aria-label="outlined secondary button group" >
              Login
            </Button>
            <Dialog open = {open} onClose = {handleClose} aria-labelledby="form-dialog-title">
              <DialogContent>
                <DialogContentText>
                  Please Enter your Username and Password below.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  type="text"
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="Password"
                  onChange={handleInputChange}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {handleClose(); addItem(); }} color="primary">
                  Login
                </Button>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
        </div>
      </>
    )
  }

  