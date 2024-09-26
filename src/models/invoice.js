import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Ensure you import uuidv4

const ItemSchema = new Schema({
  name: { type: String, required: true },
  months: { type: Number, required: true },
  Delay: { type: Number, required: true },
  stampmoney: { type: Number, required: true },
  TVA: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  id: { type: String, default: uuidv4 }, // Generate a UUID for each item
});

const InvoiceSchema = new Schema({
  Invoicenumber: { type: String, required: true },
  clientName: { type: String, required: true },
  clientPhone: { type: String, required: true },
  clientStreet: { type: String, required: true },
  clientCity: { type: String, required: true },
  clientstatus: { type: String, required: true },
  clientCountry: { type: String, required: true },
  selectDeliveryDate: { type: Date, default: Date.now },
  selectDeliveryDatefrom: { type: Date, default: Date.now },
  selectDeliveryDateto: { type: Date, default: Date.now },
  paymentTerms: { type: Number, required: true },
  description: { type: String, required: true }, // Assuming projectDescription should be description
  items: [ItemSchema],
  FinalP: { type: Number, required: true },
});

export default model('Invoice', InvoiceSchema);
