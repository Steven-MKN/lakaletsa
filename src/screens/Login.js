import { Button, Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../lakaletsa_logo_full.png'
import { SAGA_LOGIN_ACTION } from '../features/auth/state/authSaga'
import useGlobalStyles from '../useGlobalStyles'
import Loader from '../commonComponents/Loader'
import { updateLoading } from '../rootState/appSlice'

function Login() {
   const globalStyles = useGlobalStyles()
   const dispatch = useDispatch()
   dispatch(updateLoading(false))
   const { isLoading, message, error } = useSelector((state) => state.app)

   const [loginState, setLoginState] = useState({
      inputEmail: '',
      inputPassword: '',
      inputEmailError: null,
      inputPasswordError: null,
   })

   const onTextInputChange = (e) => {
      setLoginState({
         ...loginState,
         [e.target.id]: e.target.value,
      })
   }

   const onLoginClick = () => {
      let valid = true
      let emailError = null
      let passwordError = null

      if (loginState.inputEmail === '') {
         valid = false
         emailError = '*please provide a valid email'
      } else if (loginState.inputPassword === '') {
         valid = false
         passwordError = '*please provide a password'
      }

      if (valid) {
         dispatch(updateLoading(true))
         dispatch({
            type: SAGA_LOGIN_ACTION,
            payload: {
               email: loginState.inputEmail,
               password: loginState.inputPassword,
            },
         })
      }
      setLoginState({
         ...loginState,
         inputEmailError: emailError,
         inputPasswordError: passwordError,
      })
   }

   useEffect(() => {
      if (error || message) {
         alert(message || error)
      }
   }, [error, message])

   return (
      <div>
         {isLoading && <Loader />}
         <div className="Signup">
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
                  <h1>Login</h1>
               </Grid>

               <Grid item xs={10}>
                  <TextField
                     id="inputEmail"
                     label="Email"
                     variant="outlined"
                     onChange={onTextInputChange}
                     value={loginState.inputEmail}
                     error={loginState.inputEmailError ? true : undefined}
                     helperText={
                        loginState.inputEmailError
                           ? loginState.inputEmailError
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
                     value={loginState.inputPassword}
                     error={loginState.inputPasswordError ? true : undefined}
                     helperText={
                        loginState.inputPasswordError
                           ? loginState.inputPasswordError
                           : undefined
                     }
                  />
               </Grid>

               <Grid item xs={10}>
                  <Button
                     variant="contained"
                     color="primary"
                     className={[
                        globalStyles.primaryButton,
                        globalStyles.fullWidth,
                     ]}
                     onClick={onLoginClick}
                  >
                     login
                  </Button>
               </Grid>

               <Grid item xs={10}>
                  <Link to="/signup">or signup</Link>
               </Grid>
            </Grid>
         </div>
      </div>
   )
}

export default Login
