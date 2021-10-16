import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
   name: 'app',
   initialState: {
      hasBackButton: true,
      hasAddButton: true,
      notificationsCount: 0,
      isLoading: true,
      error: null,
      message: null,
      isToasting: false,
      toastMessage: '',
      toastSeverity: '',
   },
   reducers: {
      setBackButton: (state, action) => {
         state.hasBackButton = action.payload
      },
      setAddButton: (state, action) => {
         state.hasAddButton = action.payload
      },
      setNotificationsCount: (state, action) => {
         state.notificationsCount = action.payload
      },
      updateLoading: (state, action) => {
         state.isLoading = action.payload
      },
      makeError: (state, action) => {
         state.error = action.payload
         state.isLoading = false
      },
      makeMessage: (state, action) => {
         state.message = action.payload
         state.isLoading = false
      },
      resetError: (state, action) => {
         state.error = null
      },
      resetMessage: (state, action) => {
         state.message = null
      },
      showToast: (state, action) => {
         state.toastMessage = action.payload.message
         state.toastSeverity = action.payload.type
         state.isToasting = true
      },
      hideToast: (state, action) => {
         state.isToasting = false
      },
   },
})

export const {
   setBackButton,
   setAddButton,
   setNotificationsCount,
   updateLoading,
   makeError,
   makeMessage,
   resetError,
   resetMessage,
   showToast,
   hideToast,
} = appSlice.actions

export default appSlice.reducer
