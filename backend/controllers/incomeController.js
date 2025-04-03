const xlsx = require('xlsx');
const Income = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            user_id: userId,  // ✅ Matches schema
            icon,
            source,
            amount,
            date: new Date(date)  // ✅ Correctly parses date
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ 
            message: "Failed to add income", 
            error: error.message 
        });
    }
};

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    // Check if userId is available
    if (!userId) {
        return res.status(400).json({ message: 'User ID is missing or invalid' });
    }

    try {
        const income = await Income.find({ user_id: userId }).sort({ date: -1 });
        // If no income records found
        if (!income || income.length === 0) {
            return res.status(404).json({ message: "No income records found for the user" });
        }

        res.json(income); // Return the income data
    } catch (error) {
        console.error('Error fetching income data:', error); // Log the error for debugging
        res.status(500).json({ message: "Error fetching income data", error: error.message });
    }
};


// DELETE FUNCTION
exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findByIdAndDelete(req.params.id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting income", error: error.message });
    }
};


exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;  // Fixed: renamed UserId to userId

    try {
        const income = await Income.find({ user_id: userId }).sort({ date: -1 });  // Fixed: renamed Income to income

        const data = income.map((item) => ({
            source: item.source,
            amount: item.amount,
            date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, 'Income_Details.xlsx');
        res.download('Income_Details.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Error downloading income data", error: error.message });  // Fixed: updated error message
    }
};
