import { createSlice } from '@reduxjs/toolkit'

export const reportReducer = createSlice({
  name: 'report',
  initialState: {
    reports: [],
  },
  reducers: {
    setReports: (state, action) => {
      state.reports = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setReports } = reportReducer.actions

export default reportReducer.reducer