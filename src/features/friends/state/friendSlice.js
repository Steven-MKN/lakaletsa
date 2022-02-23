import { createSlice } from '@reduxjs/toolkit'

export const friendSlice = createSlice({
   name: 'friend',
   initialState: {
      friends: [],
   },
   reducers: {
      updateFriends: (state, action) => {
         state.friends = [...state.friends, action.payload.friends]
      },
   },
})

export const { updateFriends } =
   friendSlice.actions

export default friendSlice.reducer
