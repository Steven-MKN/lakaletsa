import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      email: null,
      displayName: null,
      isEmailVerified: false,
      photoUrl: null,
      uid: null,
   },
   reducers: {
      logout: (state, action) => {
         state.email = null
         state.displayName = null
         state.isEmailVerified = false
         state.photoUrl = null
         state.uid = null
         state.error = null
         state.message = action.payload.message
      },
      updateUser: (state, action) => {
         state.email = action.payload.email || state.email
         state.displayName = action.payload.displayName || state.displayName
         state.isEmailVerified =
            action.payload.isEmailVerified || state.isEmailVerified
         state.photoUrl = action.payload.photoUrl || state.photoUrl
         state.uid = action.payload.uid || state.uid
         state.message = action.payload.message || state.message
         state.error = null
      },
   },
})

export const { logout, updateUser } = authSlice.actions

export default authSlice.reducer
