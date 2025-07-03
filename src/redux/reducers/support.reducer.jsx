import { createSlice } from '@reduxjs/toolkit'

export const supportReducer = createSlice({
  name: 'report',
  initialState: {
    supports: [],
  },
  reducers: {
    setSupport: (state, action) => {
      state.supports = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSupport } = supportReducer.actions

export default supportReducer.reducer