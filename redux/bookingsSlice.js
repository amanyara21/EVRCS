import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload; 
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload); 
    },
    cancelBooking: (state, action) => {
        state.bookings = state.bookings.filter(booking => booking.bookingId !== action.payload);
    },
  },
});

export const { setBookings, addBooking, cancelBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
