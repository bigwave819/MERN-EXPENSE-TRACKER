const xlsx = require('xlsx')
const Expense = require('../models/expenseModel')

exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            user_id: userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Error adding the expense", error: error.message });
    }
};


exports.getAllExpense = async (req, res) => {
    const userId = req.user.id

    try {
        const expense = await Expense.find({ user_id: userId }).sort({ date: -1 });
        res.json(expense)
    } catch (error) {
        res.status(500).json({ message: "error registering the user", error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({ message: "Expense deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "error registering the user", error: error.message });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const UserId = req.user.id;

    try {
        const expense = await Expense.find({ user_id: UserId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            category: item.category,
            source: item.amount,
            date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expense');
        xlsx.writeFile(wb, 'Expense_Details.xlsx');
        res.download('Expense_Details.xlsx')
    } catch (error) {
        res.status(500).json({ message: "error registering the user", error: error.message });
    }
};