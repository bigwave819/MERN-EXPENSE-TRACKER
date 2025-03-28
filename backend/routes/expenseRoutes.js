const express = require("express")

const { 
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
 } =  require('../controllers/expenseController');

 const { protected } = require('../middleware/authMiddleware');

 const router = express.Router();

router.post('/add', protected, addExpense);
router.get('/get', protected, getAllExpense);
router.get('/downloadExcel', protected, downloadExpenseExcel);
router.delete('/:id', protected, deleteExpense);

module.exports = router;