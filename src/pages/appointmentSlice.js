import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: null,
  reducers: {
    appointmentDetail: (state, action) => {
      return action.payload;
    },
  },
});

export const getAppointment = (state) => state.appointment;
export default appointmentSlice.reducer;
