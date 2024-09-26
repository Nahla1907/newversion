import { Router } from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  queueLimit: 0,
});

// Existing POST route for creating invoices
router.post('/', async (req, res) => {
  const { formattedItems } = req.body;

  if (!formattedItems || !Array.isArray(formattedItems) || formattedItems.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing formattedItems array' });
  }

  const invoice = formattedItems[0];
  const {
    Invoicenumber, clientName, clientPhone, clientStreet, clientCity,
    clientstatus, clientCountry, selectDeliveryDate, selectDeliveryDatefrom,
    selectDeliveryDateto, paymentTerms, description, items, FinalP
  } = invoice;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing items array' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const item of items) {
      await connection.query(
        `INSERT INTO invoices (Invoicenumber, clientName, clientPhone, clientStreet, clientCity, clientstatus, clientCountry, selectDeliveryDate, selectDeliveryDatefrom, selectDeliveryDateto, paymentTerms, description, total, stampmoney, TVA, FinalP, itemName, months, Delay, price, new1, new2, new3)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [Invoicenumber, clientName, clientPhone, clientStreet, clientCity, clientstatus, clientCountry, selectDeliveryDate, selectDeliveryDatefrom, selectDeliveryDateto, paymentTerms, description, item.total, item.stampmoney, item.TVA, item.FinalP, item.itemName, item.months, item.Delay, item.price, item.new1, item.new2, item.new3]
      );
      
    }

    await connection.commit();
    res.json({ success: true, message: 'Invoice and items saved successfully' });
  } catch (err) {
   
    console.error('Error saving data:', err.message);
    res.status(500).send('Server Error');
  } finally {
   
  }
});



// Route to get all invoices
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoices');
    res.json(rows);
  } catch (err) {
    console.error('Error retrieving data:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Route to get all invoices from invoices19 table
router.get('/invoices19', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoices19');
    res.json(rows);
  } catch (err) {
    console.error('Error retrieving data:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/invoices19/:Id', async (req, res) => {
  const { invoiceId } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM invoices19 WHERE Id = ?', [Id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error retrieving data:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});


// New route to get a specific invoice by ID
router.get('/:invoiceId', async (req, res) => {
  const { invoiceId } = req.params;
  try {
    console.log(`Fetching invoice with ID: ${invoiceId}`); // Debugging log
    const [rows] = await pool.query('SELECT * FROM invoices WHERE invoiceId = ?', [invoiceId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error retrieving data:', err.message); // Debugging log
    res.status(500).json({ error: 'Server Error' });
  }
});

// DELETE route to delete an invoice by ID
router.delete('/:invoiceId', async (req, res) => {
  const { invoiceId } = req.params;
  console.log(`Received delete request for invoice ID: ${invoiceId}`); // Debugging log

  let connection;
  try {
    connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM invoices WHERE invoiceId = ?', [invoiceId]);

    if (result.affectedRows === 0) {
      console.log(`Invoice with ID ${invoiceId} not found`); // Debugging log
      return res.status(404).json({ message: 'Invoice not found' });
    }

    console.log(`Invoice with ID ${invoiceId} deleted successfully`); // Debugging log
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error); // Debugging log
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    //if (connection) connection.release();
  }
});




router.post('/:invoiceId', async (req, res) => {
  const { invoiceId } = req.params;
  const {
    Invoicenumber, clientName, clientPhone, clientStreet, clientCity,
    clientstatus, clientCountry, selectDeliveryDate, selectDeliveryDatefrom,
    selectDeliveryDateto, paymentTerms, description, items, FinalP
  } = req.body;

  console.log('Request body:', req.body);
  console.log('Invoice ID:', invoiceId);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing items array' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.query(
      `UPDATE invoices SET Invoicenumber = ?, clientName = ?, clientPhone = ?, clientStreet = ?, clientCity = ?, clientstatus = ?, clientCountry = ?, selectDeliveryDate = ?, selectDeliveryDatefrom = ?, selectDeliveryDateto = ?, paymentTerms = ?, description = ?, FinalP = ? WHERE Id = ?`,
      [ Invoicenumber, clientName, clientPhone, clientStreet, clientCity, clientstatus, clientCountry, selectDeliveryDate, selectDeliveryDatefrom, selectDeliveryDateto, paymentTerms, description, FinalP, invoiceId]
    );
    
    // Delete existing items
    await connection.query('DELETE FROM invoices_items WHERE invoiceId = ?', [invoiceId]);
    
    // Insert new items
    for (const item of items) {
      await connection.query(
        `INSERT INTO invoices_items (invoiceId, itemName, months, Delay, price, new1, new2, new3) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [invoiceId, item.itemName, item.months, item.Delay, item.price, item.new1, item.new2, item.new3]
      );
    }

    await connection.commit();
    res.json({ success: true, message: 'Invoice updated successfully' });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error updating invoice:', err.message);
    res.status(500).json({ error: 'Server Error', details: err.message });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});




export default router;




// New POST route for creating invoices in invoices19 table
// router.post('/invoices19', async (req, res) => {
//   const { formattedItems } = req.body;

//   if (!formattedItems || !Array.isArray(formattedItems) || formattedItems.length === 0) {
//     return res.status(400).json({ error: 'Invalid or missing formattedItems array' });
//   }

//   const invoice = formattedItems[0];
//   const {
//     Invoicenumber, clientName, clientPhone, clientStreet, clientCity,
//     clientstatus, clientCountry, selectDeliveryDate, selectDeliveryDatefrom,
//     selectDeliveryDateto, paymentTerms, description, items, FinalP
//   } = invoice;

//   if (!items || !Array.isArray(items) || items.length === 0) {
//     return res.status(400).json({ error: 'Invalid or missing items array' });
//   }

//   let connection;
//   try {
//     connection = await pool.getConnection();
//     await connection.beginTransaction();

//     for (const item of items) {
//       await connection.query(
//         `INSERT INTO invoices (Invoicenumber, clientName, clientPhone, clientStreet, clientCity, clientstatus, clientCountry, selectDeliveryDate, selectDeliveryDatefrom, selectDeliveryDateto, paymentTerms, description, total, stampmoney, TVA, FinalP, itemName, months, Delay, price)
//         VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [Invoicenumber, clientName, clientPhone, clientStreet, clientCity, clientstatus, clientCountry, selectDeliveryDate, selectDeliveryDatefrom, selectDeliveryDateto, paymentTerms, description, item.total, item.stampmoney, item.TVA, item.FinalP, item.itemName, item.months, item.Delay, item.price]
//       );
//     }

//     await connection.commit();
//     res.json({ success: true, message: 'Invoice and items saved successfully' });
//   } catch (err) {
//     if (connection) {
//       await connection.rollback();
//     }
//     console.error('Error saving data:', err.message);
//     res.status(500).send('Server Error');
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// });