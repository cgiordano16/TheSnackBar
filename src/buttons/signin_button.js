import React, {useState, useRef} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


export function Sign_In_Button(){
  
    const [open, setOpen] = React.useState(false);

    
    const handleInputChange = e =>{
      console.log(e.target)
      const {id, value} = e.target
      setValues({...values, [id]: value})
    }
    
   
    const addItem = () => {
      const {username, password, confirmPassword} = values
      console.log(values)
      if(!username || !password || !confirmPassword) return
      const str_body = JSON.stringify(values);
      fetch('http://localhost:9000/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: str_body
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success: ', result);
      })
      .catch(error => {
        console.error('Error: ', error)
      });
    }


    const handleClickOpen = () => {
      setOpen(true);
    };

    const [values, setValues] = React.useState({username: '', password: '', confirmPassword: ''})

    const handleClose = () => {
      setOpen(false);
    };
    
    return(
      <>
        <div className = "signin_button_container">    
            <Button onClick={handleClickOpen} color="default" variant = "contained" aria-label="outlined secondary button group" >
              Sign Up
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
                  //ref = {um => inputRef.current['username'] = um}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="Password"
                  onChange={handleInputChange}
                  //ref = {p => inputRef.current['password'] = p}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="confirmPassword"
                  label="Confirm Password"
                  type="Password"
                  onChange={handleInputChange}
                  //ref = {cp => inputRef.current['confirmPassword'] = cp}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={addItem} color="primary">
                  Signup
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
