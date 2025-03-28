const xlsx = require('xlsx')
const Income = require('../models/incomeModel')

exports.addIncome = async (req, res) => {

    const userId = req.user.id
 
   try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
        return res.status(400).json({ message: "all fields are required" })
    }

    const newIncome = ({
        userId,
        icon,
        source,
        amount,
        date: new Date(date)
    });

    await newIncome.save()
    res.status(200).json(newIncome)
   } catch (error) {
    res.status(500).json({ message: "error registering the user", error: error.message });
   }
};

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id

    try {
        const income = await Income.find({userId}).sort({ date: -1 });
        res.json(income)
    } catch (error) {
        res.status(500).json({ message: "error registering the user", error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id)
        res.json({ message: "Income deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "error registering the user", error: error.message });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    const UserId = req.user.id;

    try {
        const Income = await Income.find({userId}).sort({ date: -1 });

        const data = income.map((item) => ({
            source: item.source,
            source: item.amount,
            date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, 'Income_Details.xlsx');
        res.download('Income_Details.xlsx')
    } catch (error) {
        res.status(500).json({ message: "error registering the user", error: error.message });
    }
};