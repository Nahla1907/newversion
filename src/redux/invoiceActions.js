// import axios from 'axios';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Get the backend URL from the environment variable
// const backendUrl = process.env.REACT_APP_BACKEND_URL;

// // Action to create an invoice in the invoices table
// export const createInvoice = createAsyncThunk(
//   'invoices/createInvoice',
//   async (invoiceData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${backendUrl}/api/invoices`, invoiceData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Action to fetch all invoices from the invoices table
// export const fetchInvoices = createAsyncThunk(
//   'invoices/fetchInvoices',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/invoices`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Action to delete an invoice from the invoices table
// export const deleteInvoiceAsync = createAsyncThunk(
//   'invoices/deleteInvoice',
//   async (invoiceId, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${backendUrl}/api/invoices/${invoiceId}`);
//       return invoiceId; // Return the ID of the deleted invoice
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // Action to create an invoice in the invoices19 table
// export const createInvoice19 = createAsyncThunk(
//   'invoices19/createInvoice19',
//   async (invoiceData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${backendUrl}/api/invoices19`, invoiceData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Action to fetch all invoices from the invoices19 table
// export const fetchInvoices19 = createAsyncThunk(
//   'invoices/fetchInvoices19',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/invoices19`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Action to delete an invoice from the invoices19 table
// export const deleteInvoice19Async = createAsyncThunk(
//   'invoices19/deleteInvoice19',
//   async (Id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${backendUrl}/api/invoices19/${Id}`);
//       return Id; // Return the ID of the deleted invoice
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// // Add any other actions you need here...


import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action to create an invoice in the invoices table
export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://wonderful-amazement-production.up.railway.app/api/invoices', invoiceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action to fetch all invoices from the invoices table
export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://wonderful-amazement-production.up.railway.app/api/invoices');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action to delete an invoice from the invoices table
export const deleteInvoiceAsync = createAsyncThunk(
  'invoices/deleteInvoice',
  async (invoiceId, { rejectWithValue }) => {
    try {
      await axios.delete(`https://wonderful-amazement-production.up.railway.app/api/invoices/${invoiceId}`);
      return invoiceId; // Return the ID of the deleted invoice
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Action to create an invoice in the invoices19 table
export const createInvoice19 = createAsyncThunk(
  'invoices19/createInvoice19',
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://wonderful-amazement-production.up.railway.app/api/invoices19', invoiceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action to fetch all invoices from the invoices19 table
export const fetchInvoices19 = createAsyncThunk(
  'invoices/fetchInvoices19',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://wonderful-amazement-production.up.railway.app/api/invoices19');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action to delete an invoice from the invoices19 table
export const deleteInvoice19Async = createAsyncThunk(
  'invoices19/deleteInvoice19',
  async (Id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://wonderful-amazement-production.up.railway.app/api/invoices19/${Id}`);
      return Id; // Return the ID of the deleted invoice
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// invoiceActions.js

// Action to fetch filtered invoices by client name
