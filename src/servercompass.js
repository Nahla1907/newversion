import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/OPGI');

// Define a schema and model
const invoiceSchema = new mongoose.Schema({
  Invoicenumber: String,
  clientName: String,
  clientEmail: String,
  clientStreet: String,
  clientCity: String,
  clientPostCode: String,
  clientCountry: String,
  selectDeliveryDate: String,
  selectDeliveryDatefrom: String,
  paymentTerms: String,
  projectDescription: String,
  items: Array,
});
try {
  await mongoose.connect('mongodb://127.0.0.1:27017/OPGI', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  console.log('MongoDB connected...');
} catch (err) {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Define routes
app.post('/api/invoices', async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(201).send(newInvoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
