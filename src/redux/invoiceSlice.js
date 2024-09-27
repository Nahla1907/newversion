// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import moment from 'moment';

// // Get today's date formatted as 'YYYY-MM-DD'
// const today = moment().format('YYYY-MM-DD');

// // Async Thunks
// // Fetch an invoice by ID
// export const getInvoiceById = createAsyncThunk(
//   'invoices/getInvoiceById',
//   async (invoiceId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/api/invoices/${invoiceId}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Error fetching invoice by ID');
//     }
//   }
// );

// // Delete an invoice by ID
// export const deleteInvoiceAsync = createAsyncThunk(
//   'invoices/deleteInvoice',
//   async (invoiceId, { rejectWithValue }) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`);
//       return invoiceId;
//     } catch (err) {
//       return rejectWithValue('Error deleting invoice');
//     }
//   }
// );

// // Fetch filtered invoices based on client name and status
// export const fetchFilteredInvoices = createAsyncThunk(
//   'invoices/fetchFilteredInvoices',
//   async ({ name, clientstatus }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/invoices/filter?name=${name}&clientstatus=${clientstatus}`
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Error fetching filtered invoices');
//     }
//   }
// );

// // Create a new invoice
// export const createInvoice = createAsyncThunk(
//   'invoices/createInvoice',
//   async (formattedItems, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/invoices', { formattedItems });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Error creating invoice');
//     }
//   }
// );

// // Fetch all invoices
// export const fetchInvoices = createAsyncThunk(
//   'invoices/fetchInvoices',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/invoices');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Error fetching invoices');
//     }
//   }
// );

// // Create a new invoice in invoices19 table
// export const createInvoice19 = createAsyncThunk(
//   'invoices/createInvoice19',
//   async (formattedItems, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/invoices19', { formattedItems });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Error creating invoice in invoices19');
//     }
//   }
// );

// // Fetch all invoices from invoices19 table
// export const fetchInvoices19 = createAsyncThunk(
//   'invoices/fetchInvoices19',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/invoices19');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Error fetching invoices from invoices19');
//     }
//   }
// );

// // Edit an existing invoice
// export const editInvoiceAsync = createAsyncThunk(
//   'invoices/editInvoiceAsync',
//   async ({ invoiceId, updatedData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/invoices/${invoiceId}`, updatedData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Error updating invoice');
//     }
//   }
// );

// // Helper function to calculate totals from invoice items
// const calculateTotals = (items) => {
//   const total = items.reduce((acc, i) => acc + Number(i.total), 0);
//   const stampmoney = items.reduce((acc, i) => acc + Number(i.stampmoney), 0);
//   const TVA = items.reduce((acc, i) => acc + Number(i.TVA), 0);
//   const FinalP = items.reduce((acc, i) => acc + Number(i.FinalP), 0);
//   return { total, stampmoney, TVA, FinalP };
// };

// // Slice definition
// const invoiceSlice = createSlice({
//   name: 'invoices',
//   initialState: {
//     invoices: [],
//     invoices19: [],
//     filteredInvoice: [],
//     invoiceById: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setSelectedInvoice: (state, action) => {
//       state.selectedInvoice = action.payload;
//     },
//     filterInvoice: (state, action) => {
//       const { clientstatus, name } = action.payload;
//       const dataToFilter = state.invoices19.length ? state.invoices19 : state.invoices;

//       state.filteredInvoice = dataToFilter.filter((invoice) => {
//         const matchesName = name ? invoice.clientName19.toLowerCase().includes(name.toLowerCase()) : true;
//         const matchesStatus = clientstatus ? invoice.clientstatus19 === clientstatus : true;
//         return matchesName && matchesStatus;
//       });
//     },
//     saveInvoice: (state, action) => {
//       state.invoices.push(action.payload);
//     },
//     updateInvoiceStatus: (state, action) => {
//       const { invoiceId, clientstatus } = action.payload;
//       const invoiceToUpdate = state.invoices.find((invoice) => invoice.Id === invoiceId);
//       if (invoiceToUpdate) {
//         invoiceToUpdate.clientstatus = clientstatus;
//       }
//     },
//     addInvoice: (state, action) => {
//       const { items, ...invoiceDetails } = action.payload;
//       const { total, stampmoney, TVA, FinalP } = calculateTotals(items);

//       const { new1, new2, new3 } = invoiceDetails;

//       const newInvoice = {
//         ...invoiceDetails,
//         selectDeliveryDate: today,
//         paymentDue: getForwardDate(invoiceDetails.paymentTerms),
//         clientstatus: 'pending',
//         items,
//         total,
//         stampmoney,
//         new1,
//         new2,
//         new3,
//         TVA,
//         FinalP,
//       };
//       state.invoices.push(newInvoice);
//     },
//     editInvoice: (state, action) => {
//       const { invoiceId, items, ...invoiceDetails } = action.payload;
//       const { total, stampmoney, TVA, FinalP } = calculateTotals(items);

//       const invoiceIndex = state.invoices.findIndex((invoice) => invoice.Id === invoiceId);
//       if (invoiceIndex !== -1) {
//         const { new1, new2, new3 } = invoiceDetails;

//         state.invoices[invoiceIndex] = {
//           ...state.invoices[invoiceIndex],
//           ...invoiceDetails,
//           selectDeliveryDate: today,
//           paymentDue: getForwardDate(invoiceDetails.paymentTerms),
//           clientstatus: 'pending',
//           items,
//           total,
//           stampmoney,
//           new1,
//           new2,
//           new3,
//           TVA,
//           FinalP,
//         };
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle fetchInvoices
//       .addCase(fetchInvoices.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchInvoices.fulfilled, (state, action) => {
//         state.loading = false;
//         state.invoices = action.payload;
//         state.filteredInvoice = action.payload;
//       })
//       .addCase(fetchInvoices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle fetchInvoices19
//       .addCase(fetchInvoices19.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchInvoices19.fulfilled, (state, action) => {
//         state.loading = false;
//         state.invoices19 = action.payload;
//         state.filteredInvoice = action.payload;
//       })
//       .addCase(fetchInvoices19.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle getInvoiceById
//       .addCase(getInvoiceById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getInvoiceById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.invoiceById = action.payload;
//       })
//       .addCase(getInvoiceById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle deleteInvoiceAsync
//       .addCase(deleteInvoiceAsync.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteInvoiceAsync.fulfilled, (state, action) => {
//         state.loading = false;
//         state.invoices = state.invoices.filter((invoice) => invoice.Id !== action.payload);
//         state.filteredInvoice = state.invoices;
//       })
//       .addCase(deleteInvoiceAsync.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle createInvoice
//       .addCase(createInvoice.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createInvoice.fulfilled, (state, action) => {
//         state.loading = false;
//         state.invoices.push(action.payload);
//         state.filteredInvoice = state.invoices; // Update filtered invoice
//       })
//       .addCase(createInvoice.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// // Export actions and reducer
// export const {
//   setSelectedInvoice,
//   filterInvoice,
//   saveInvoice,
//   updateInvoiceStatus,
//   addInvoice,
//   editInvoice,
// } = invoiceSlice.actions;
// export default invoiceSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

const today = moment().format('YYYY-MM-DD');

// Async Thunks
export const getInvoiceById = createAsyncThunk(
  'invoices/getInvoiceById',
  async (invoiceId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/invoices/${invoiceId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching invoice by ID');
    }
  }
);

export const deleteInvoiceAsync = createAsyncThunk(
  'invoices/deleteInvoice',
  async (invoiceId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`);
      return invoiceId;
    } catch (err) {
      return rejectWithValue('Error deleting invoice');
    }
  }
);

export const fetchFilteredInvoices = createAsyncThunk(
  'invoices/fetchFilteredInvoices',
  async ({ name, clientstatus }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/invoices/filter?name=${name}&clientstatus=${clientstatus}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching filtered invoices');
    }
  }
);

export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async (formattedItems, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/invoices', { formattedItems });
      return response.data;
    } catch (error) {
      return rejectWithValue('Error creating invoice');
    }
  }
);

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/invoices');
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching invoices');
    }
  }
);

export const createInvoice19 = createAsyncThunk(
  'invoices/createInvoice19',
  async (formattedItems, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/invoices19', { formattedItems });
      return response.data;
    } catch (error) {
      return rejectWithValue('Error creating invoice in invoices19');
    }
  }
);

export const fetchInvoices19 = createAsyncThunk(
  'invoices/fetchInvoices19',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/invoices19');
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching invoices from invoices19');
    }
  }
);

export const editInvoiceAsync = createAsyncThunk(
  'invoices/editInvoiceAsync',
  async ({ invoiceId, updatedData }, { rejectWithValue }) => {
    try {
      console.log('InvoiceId:', invoiceId); // Log to check if invoiceId is passed
      const response = await axios.put(`http://localhost:5000/api/invoices/${invoiceId}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Error updating invoice');
    }
  }
);

// Helper functions
const calculateTotals = (items) => {
  const total = items.reduce((acc, i) => acc + Number(i.total), 0);
  const stampmoney = items.reduce((acc, i) => acc + Number(i.stampmoney), 0);
  const TVA = items.reduce((acc, i) => acc + Number(i.TVA), 0);
  const FinalP = items.reduce((acc, i) => acc + Number(i.FinalP), 0);
  return { total, stampmoney, TVA, FinalP };
};

// Slice
const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    invoices19: [],
    filteredInvoice: [],
    invoiceById: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
    },
    filterInvoice: (state, action) => {
      const { clientstatus, name } = action.payload;
      const dataToFilter = state.invoices19.length ? state.invoices19 : state.invoices;

      state.filteredInvoice = dataToFilter.filter((invoice) => {
        const matchesName = name ? invoice.clientName19.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesStatus = clientstatus ? invoice.clientstatus19 === clientstatus : true;
        return matchesName && matchesStatus;
      });
    },
    saveInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    updateInvoiceStatus: (state, action) => {
      const { invoiceId, clientstatus } = action.payload;
      const invoiceToUpdate = state.invoices.find((invoice) => invoice.Id === invoiceId); // Ensure the key matches your schema
      if (invoiceToUpdate) {
        invoiceToUpdate.clientstatus = clientstatus;
      }
    },
    addInvoice: (state, action) => {
      const { items, ...invoiceDetails } = action.payload;
      const { total, stampmoney, TVA, FinalP } = calculateTotals(items);

      // Destructure `new1`, `new2`, and `new3` from `invoiceDetails`
      const { new1, new2, new3 } = invoiceDetails;

      const newInvoice = {
        ...invoiceDetails,
        selectDeliveryDate: today,
        paymentDue: getForwardDate(invoiceDetails.paymentTerms),
        clientstatus: 'pending',
        items,
        total,
        stampmoney,
        new1,
        new2,
        new3,
        TVA,
        FinalP,
      };
      state.invoices.push(newInvoice);
    },
    editInvoice: (state, action) => {
      const { invoiceId, items, ...invoiceDetails } = action.payload;
      const { total, stampmoney, TVA, FinalP } = calculateTotals(items);

      const invoiceIndex = state.invoices.findIndex((invoice) => invoice.Id === invoiceId); // Ensure the key matches your schema
      if (invoiceIndex !== -1) {
        const { new1, new2, new3 } = invoiceDetails;

        state.invoices[invoiceIndex] = {
          ...state.invoices[invoiceIndex],
          ...invoiceDetails,
          selectDeliveryDate: today,
          paymentDue: getForwardDate(invoiceDetails.paymentTerms),
          clientstatus: 'pending',
          items,
          total,
          stampmoney,
          new1,
          new2,
          new3,
          TVA,
          FinalP,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
        state.filteredInvoice = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInvoices19.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices19.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices19 = action.payload;
        state.filteredInvoice = action.payload;
      })
      .addCase(fetchInvoices19.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceById = action.payload;
      })
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteInvoiceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvoiceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = state.invoices.filter((invoice) => invoice.Id !== action.payload); // Ensure the key matches your schema
        state.filteredInvoice = state.invoices;
      })
      .addCase(deleteInvoiceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices.push(action.payload);
        state.filteredInvoice = state.invoices;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createInvoice19.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice19.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices19.push(action.payload);
        state.filteredInvoice = state.invoices19;
      })
      .addCase(createInvoice19.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editInvoiceAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editInvoiceAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.invoices.findIndex((invoice) => invoice.Id === action.payload.Id); // Ensure the key matches your schema
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(editInvoiceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedInvoice, filterInvoice, saveInvoice, updateInvoiceStatus, addInvoice, editInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;