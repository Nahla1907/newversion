import { Router } from 'express';
import pool from '../db.js'; // Ensure this is the correct path to your db setup file

const router = Router();

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invoices19');
    res.json(rows);
  } catch (err) {
    console.error('Error retrieving data:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get invoice by ID
router.get('/:Id', async (req, res) => {
  const { Id } = req.params;
  try {
    const [result] = await pool.query('SELECT * FROM invoices19 WHERE Id = ?', [Id]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(result[0]);
  } catch (err) {
    console.error('Error retrieving data:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new invoice
router.post('/', async (req, res) => {
  const { formattedItems } = req.body;

  if (!formattedItems || !Array.isArray(formattedItems) || formattedItems.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing formattedItems array' });
  }

  const invoice = formattedItems[0];
  const {
    Invoicenumber19, clientName19, clientPhone19, clientStreet19, clientCity19,
    clientstatus19, clientCountry19, selectDeliveryDate19, selectDeliveryDatefrom19,
    selectDeliveryDateto19, paymentTerms19, description19, items
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
        `INSERT INTO invoices19 (Invoicenumber19, clientName19, clientPhone19, clientStreet19, clientCity19, clientstatus19, clientCountry19, selectDeliveryDate19, selectDeliveryDatefrom19, selectDeliveryDateto19, paymentTerms19, description19, total19, stampmoney19, TVA19, FinalP19, itemName19, months19, Delay19, price19)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [Invoicenumber19, clientName19, clientPhone19, clientStreet19, clientCity19, clientstatus19, clientCountry19, selectDeliveryDate19, selectDeliveryDatefrom19, selectDeliveryDateto19, paymentTerms19, description19, item.total19, item.stampmoney19, item.TVA19, item.FinalP19, item.itemName19, item.months19, item.Delay19, item.price19, item.add1, item.add2, item.add3]
      );
    }

    await connection.commit();
    res.json({ success: true, message: 'Invoice and items saved successfully' });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    console.error('Error saving data:', err.message);
    res.status(500).send('Server Error');
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// Delete an invoice by ID
router.delete('/:Id', async (req, res) => {
  const { Id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM invoices19 WHERE Id = ?', [Id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    console.error('Error deleting data:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Filter invoices by name
router.get('/filter/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const [result] = await pool.query('SELECT * FROM invoices19 WHERE clientName19 LIKE ?', [`%${name}%`]);
    res.json(result);
  } catch (err) {
    console.error('Error filtering data:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});


router.put('/:Id', async (req, res) => {
  const { Id } = req.params;
  const {
    Invoicenumber19, clientName19, clientPhone19, clientStreet19, clientCity19,
    clientstatus19, clientCountry19, selectDeliveryDate19, selectDeliveryDatefrom19,
    selectDeliveryDateto19, paymentTerms19, description19, items, FinalP19
  } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid or missing items array' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.query(
      `UPDATE invoices SET Invoicenumber19 = ?, clientName19 = ?, clientPhone19 = ?, clientStreet19 = ?, clientCity19 = ?, clientstatus19 = ?, clientCountry19 = ?, selectDeliveryDate19 = ?, selectDeliveryDatefrom19 = ?, selectDeliveryDateto19 = ?, paymentTerms19 = ?, description19 = ?, FinalP19 = ? WHERE Id = ?`,
      [Invoicenumber19, clientName19, clientPhone19, clientStreet19, clientCity19, clientstatus19, clientCountry19, selectDeliveryDate19, selectDeliveryDatefrom19, selectDeliveryDateto19, paymentTerms19, description19, FinalP19, Id]
    );

    await connection.query('DELETE FROM invoices19 WHERE Id = ?', [Id]);

    for (const item of item) {
      await connection.query(
        `INSERT INTO invoices19 (Id, itemName19, months19, Delay19, price19) VALUES (?, ?, ?, ?, ?)`,
        [Id, item.itemName19, item.months19, item.Delay19, item.price19]
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
