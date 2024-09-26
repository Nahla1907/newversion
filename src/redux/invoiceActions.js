import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action to create an invoice in the invoices table
export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/invoices', invoiceData);
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
      const response = await axios.get('http://localhost:5000/api/invoices');
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
      await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`);
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
      const response = await axios.post('http://localhost:5000/api/invoices19', invoiceData);
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
      const response = await axios.get('http://localhost:5000/api/invoices19');
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
      await axios.delete(`http://localhost:5000/api/invoices19/${Id}`);
      return Id; // Return the ID of the deleted invoice
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// invoiceActions.js

// Action to fetch filtered invoices by client name


