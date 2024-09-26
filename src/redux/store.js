// 

import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from '../redux/invoiceSlice'; // Adjust the path if necessary
//import invoiceReducer2 from '../redux/invoiceSlice2'; // Adjust the path if necessary

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    
    
    
  }
});

export default store;
