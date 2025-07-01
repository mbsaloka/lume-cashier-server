const Transaction = require('../models/transactionModel');
const Product = require('../models/productModel');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }).populate('items.productId', 'name price');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
}

exports.addTransaction = async (req, res) => {
  const { items, total, method } = req.body;

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      return res.status(400).json({ message: `Product with ID ${item.productId} not found` });
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
    }

    // Update product stock
    product.stock -= item.quantity;
    await product.save();
  }

  try {
    const newTransaction = new Transaction({ items, total, method });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error adding transaction', error });
  }
}
