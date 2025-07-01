const Transaction = require('../models/transactionModel');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalSales = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);
    const totalTransactions = await Transaction.countDocuments();
    const totalItemsSold = await Transaction.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: null,
          totalItems: { $sum: '$items.quantity' }
        }
      }
    ]);
    res.status(200).json({
      totalSales: totalSales[0] ? totalSales[0].total : 0,
      totalTransactions,
      totalItemsSold: totalItemsSold[0] ? totalItemsSold[0].totalItems : 0
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error });
  }
}
