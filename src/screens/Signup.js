import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import logo from '../lakaletsa_logo_full.png'
import { Link } from 'react-router-dom'
import useGlobalStyles from '../useGlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import {
   SAGA_SIGNUP_ACTION,
   SAGA_UPDATE_LOADING,
} from '../features/auth/state/authSaga'
import { updateLoading } from '../rootState/appSlice'

function Signup() {
   const globalStyles = useGlobalStyles()
   const dispatch = useDispatch()

   const { isLoading, message, error } = useSelector((state) => state.app)

   const [signupState, setSignupState] = useState({
      inputEmail: '',
      inputPassword: '',
      inputConfirmPassword: '',
      inputEmailError: null,
      inputPasswordError: null,
      inputConfirmPasswordError: null,
   })

   const onTextInputChange = (e) => {
      setSignupState({
         ...signupState,
         [e.target.id]: e.target.value,
      })
   }

   const onSignupClick = () => {
      let valid = true
      let emailError = null
      let passwordError = null
      let confirmPasswordError = null

      if (signupState.inputEmail === '') {
         valid = false
         emailError = '*please provide a valid email'
      } else if (signupState.inputPassword === '') {
         valid = false
         passwordError = '*please provide a password'
      } else if (
         signupState.inputPassword !== signupState.inputConfirmPassword
      ) {
         valid = false
         confirmPasswordError = '*passwords do not match'
      }

      if (valid) {
         dispatch(updateLoading(true))
         dispatch({
            type: SAGA_SIGNUP_ACTION,
            payload: {
               email: signupState.inputEmail,
               password: signupState.inputPassword,
            },
         })
      }
      setSignupState({
         ...signupState,
         inputEmailError: emailError,
         inputPasswordError: passwordError,
         inputConfirmPasswordError: confirmPasswordError,
      })
   }

   useEffect(() => {
      if (error || message) {
         alert(message || error)
      }
   }, [error, message])

   return [
      <div className="Signup" key="mainDiv">
         <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            direction="column"
         >
            <Grid item xs={6}>
               <img src={logo} className={globalStyles.logo} />
            </Grid>

            <Grid item xs={6}>
               <h1>Sign Up</h1>
            </Grid>

            <Grid item xs={10}>
               <TextField
                  id="inputEmail"
                  label="Email"
                  variant="outlined"
                  className={globalStyles.inputText}
                  onChange={onTextInputChange}
                  error={signupState.inputEmailError ? true : undefined}
                  helperText={
                     signupState.inputEmailError
                        ? signupState.inputEmailError
                        : undefined
                  }
               />
            </Grid>

            <Grid item xs={10}>
               <TextField
                  id="inputPassword"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={onTextInputChange}
                  error={signupState.inputPasswordError ? true : undefined}
                  helperText={
                     signupState.inputPasswordError
                        ? signupState.inputPasswordError
                        : undefined
                  }
               />
            </Grid>

            <Grid item xs={10}>
               <TextField
                  id="inputConfirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  onChange={onTextInputChange}
                  error={
                     signupState.inputConfirmPasswordError ? true : undefined
                  }
                  helperText={
                     signupState.inputConfirmPasswordError
                        ? signupState.inputConfirmPasswordError
                        : undefined
                  }
               />
            </Grid>

            <Grid item xs={10}>
               <Button
                  variant="contained"
                  color="primary"
                  className={globalStyles.primaryButton}
                  onClick={onSignupClick}
               >
                  Sign-up
               </Button>
            </Grid>

            <Grid item xs={10}>
               <Link to="/login">or go to login</Link>
            </Grid>
         </Grid>
      </div>,
      isLoading && (
         <h1 className={globalStyles.loader} key="loader">
            Loading...
         </h1>
      ),
   ]
}

export default Signup
