const Income = require('../models/incomeModel');
const Expense = require('../models/expenseModel');
const { isValidObjectId, Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } }, 
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Fetch total expense (FIXED)
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } }, 
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get Income Transactions from last 60 days 
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // Get Expense Transactions from last 30 days 
        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Get total Expense for last 30 days 
        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // Fetch last 5 transactions (combined income & expense)
        const lastTransaction = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({ ...txn.toObject(), type: "income" })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({ ...txn.toObject(), type: "expense" })
            ),
        ].sort((a, b) => b.date - a.date);

        // Final response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransaction, // ✅ FIXED
            },                       
            last30DaysIncome: {
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransactions
            },
            recentTransactions: lastTransaction
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
    }
};
