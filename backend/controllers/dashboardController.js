const Income = require('../models/incomeModel');
const Expense = require('../models/expenseModel');
const { Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch totals (corrected field names)
        const totalIncome = await Income.aggregate([
            { $match: { user_id: userObjectId } },  // ✅ user_id
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: { user_id: userObjectId } },  // ✅ user_id
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Fetch transactions (corrected field names)
        const last60DaysIncomeTransactions = await Income.find({
            user_id: userObjectId,  // ✅ user_id
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const last30DaysExpenseTransactions = await Expense.find({
            user_id: userObjectId,  // ✅ user_id
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Final response (aligned with frontend)
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            Last60DaysIncome: {  // ✅ Capitalized
                total: last60DaysIncomeTransactions.reduce((sum, txn) => sum + txn.amount, 0),
                transactions: last60DaysIncomeTransactions  // ✅ Plural
            },
            recentTransactions: [
                ...(await Income.find({ user_id: userObjectId }).limit(5)),
                ...(await Expense.find({ user_id: userObjectId }).limit(5))
            ].sort((a, b) => b.date - a.date)
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching dashboard data", 
            error: error.message 
        });
    }
};