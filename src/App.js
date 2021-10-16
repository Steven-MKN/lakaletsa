import { Route, Router, Switch, useHistory } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import Onboarding from './screens/Onboarding'
import Signup from './screens/Signup'
import useGlobalStyles from './useGlobalStyles'
import { configFirebase } from './config/firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import {
   SAGA_GET_USER_ACTION,
   SAGA_REGISTER_AUTH_STATE_CHANGE_LISTENER,
} from './features/auth/state/authSaga'
import { useEffect, useState } from 'react'
import { updateUser } from './features/auth/state/authSlice'
import { showToast, hideToast } from './rootState/appSlice'
import Loader from './commonComponents/Loader'
import Toast from './commonComponents/Toast'

function App() {
   const globalStyles = useGlobalStyles()
   const { isLoading, isToasting } = useSelector(appSelector)
   let timeout = null

   configFirebase()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch({
         type: SAGA_REGISTER_AUTH_STATE_CHANGE_LISTENER,
         payload: (user) => {
            updateUser({
               email: user?.email || null,
               displayName: user?.displayName || null,
               isEmailVerified: user?.isEmailVerified || null,
               photoUrl: user?.photoUrl || null,
               uid: user?.uid || null,
               message: 'Session found',
            })
            // TODO: update items, friends profile data and notifications too
         },
      })
      setTimeout(() => {
         dispatch({ type: SAGA_GET_USER_ACTION })
      }, 2000)
   }, [])

   useEffect(() => {
      if (isToasting) {
         timeout = setTimeout(() => {
            dispatch(hideToast())
         }, 3000)
      }
      // return () => {
      //   dispatch(hideToast());
      //   if (timeout) {
      //     clearTimeout(timeout);
      //   }
      // };
   }, [isToasting])

   if (isLoading) return <Loader />

   return [
      isToasting && <Toast severity="success" message="test" key="toaster" />,
      <div className={'App ' + globalStyles.app} key="mainApp">
         <BrowserRouter>
            <Switch>
               <Route path="/login">
                  <Login />
               </Route>

               <Route path="/signup">
                  <Signup />
               </Route>

               <Route path="/dashboard">
                  <Dashboard />
               </Route>

               <Route path="/">
                  <Onboarding />
               </Route>
            </Switch>
         </BrowserRouter>
      </div>,
   ]
}

function appSelector(state) {
   return state.app
}

export default App
