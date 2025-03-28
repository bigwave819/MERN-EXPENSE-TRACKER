const express = require("express")

const { 
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
 } =  require('../controllers/incomeController');

 const { protected } = require('../middleware/authMiddleware');

 const router = express.Router();

router.post('/add', protected, addIncome);
router.get('/get', protected, getAllIncome);
router.get('/downloadExcel', protected, downloadIncomeExcel);
router.delete('/:id', protected, deleteIncome);

module.exports = router;