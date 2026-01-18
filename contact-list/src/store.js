import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./redux/contactSlice";

const store = configureStore({
  reducer: contactReducer, 

  // reducer: { contacts: contactReducer }
});

export default store;