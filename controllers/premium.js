const express = require('express');
const app = express();
const Razorpay = require('razorpay');
require('dotenv').config(); 

// Create Razorpay instance with your Razorpay Key Id and Secret Key
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  

// Handle premium account purchase
app.post('/buyPremium', async (req, res) => {
    const userId = 1; // Replace with the actual user ID
    const amount = 50000; // Replace with the premium account amount in paisa (e.g., 50000 for ₹500.00)
  
    const options = {
      amount,
      currency: 'INR',
      receipt: 'premium_receipt_' + userId,
      payment_capture: 1,
    };
  
    try {
      const response = await razorpay.orders.create(options);
  
      const orderId = response.id;
  
      // Save the order ID and user ID in the database for reference
      const query = 'INSERT INTO orders (order_id, user_id) VALUES (?, ?)';
      connection.query(query, [orderId, userId], (err, result) => {
        if (err) {
          console.error('Error saving premium order: ' + err.stack);
          res.status(500).json({ message: 'An error occurred.' });
          return;
        }
  
        res.json({ orderId, amount });
      });
    } catch (error) {
      console.error('Error creating Razorpay order: ' + error);
      res.status(500).json({ message: 'An error occurred.' });
    }
  });
  