import { createSlice } from '@reduxjs/toolkit'

export const itemSlice = createSlice({
   name: 'item',
   initialState: {
      items: [],
   },
   reducers: {
      addItem: (state, action) => {
         state.items = [...state.items, action.payload.item]
      },
      removeItem: (state, action) => {
         state.items = state.items.filter(
            (item) => item.id === action.payload.item.id
         )
      },
      markAsBought: (state, action) => {
         const itemsCopy = Array.of(...state.items)
         itemsCopy.forEach((i) => {
            if (i.id === action.payload.item.id) {
               i.bought = true
            }
         })
         state.items = [...itemsCopy]
      },
      resetItems: (state, action) => {
         state.items = action.payload
      },
   },
})

export const { addItem, removeItem, markAsBought, resetItems } =
   itemSlice.actions

export default itemSlice.reducer
