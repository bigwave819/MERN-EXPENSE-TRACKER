const Income = require('../models/incomeModel');
const Expense = require('../models/expenseModel');

const { isValidObjectId, Types } = require('mongoose')

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //fetch total income and expense 
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } }, // Use ObjectId
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        

        console.log('totalIncome', { totalIncome, userId: isValidObjectId(userId) });
        
        //totalExpense
        const totalExpense = await Expense.aggregate([
            {$match : {userId, userObjectId}},
            {$match : { _id: null, total: { $sum : "$amount"}}}
        ]);

        // get Income Transaction from last 60 days 
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte : new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // get total income for last 60 days 
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction ) => sum + transaction.amount,
            0
        );

        //get expense transaction in last 30 days 

        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // get total Expense for last 60 days 
        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, transaction ) => sum + transaction.amount,
            0
        );

        //fetch last 5 transaction 
        const lastTransaction = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income"
                })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense"
                })
            ),
        ].sort((a, b) => b.date - a.date);        
        //final response
        res.json({
            totalBalance:
            (totalIncome[0]?.total || 0 ) - (totalExpense[0]?.total || 0 ),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransaction, // Should use expense transactions, not income!
            },                       
            last30DaysIncome:{
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransactions
            },
            recentTransaction: lastTransaction,
    })
    } catch (error) {
        res.status(500).json({ message: "error registering the user", error: error.message });
    }
}