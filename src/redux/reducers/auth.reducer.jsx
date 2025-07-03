import { createSlice } from '@reduxjs/toolkit'

export const authReducer = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = authReducer.actions

export default authReducer.reducer