import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ExpenseOverView from '../../components/expense/ExpenseOverView';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from "../../components/Modal"
import { toast } from "react-hot-toast"
import AddExpenseForm from '../../components/expense/AddExpenseForm';
import ExpenseList from '../../components/expense/ExpenseList';
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const fetchExpenseDetails = async () => {
      if (loading) return;
  
      setLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
        if (response.data) {
          setExpenseData(response.data);
        }
      } catch (error) {
        console.error("Error fetching expense data:", error);
        toast.error("Failed to fetch expense data.");
      } finally {
        setLoading(false);
      }
    };

    const deleteExpense = async (id) => {
      try {
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
        setOpenDeleteAlert({ show: false, data: null});
        toast.success("expense Details deleted successfully");
        fetchExpenseDetails();
      } catch (error) {
        console.error(
          "Error deleting expense:", 
          error.response?.data?.message || error.message
        );
        toast.error("Failed to delete expense.");
      }
    };

    const handleAddExpense = async (expense) => {
      const { category, amount, date, icon } = expense;
  
      if (!category.trim()) {
        toast.error("category is required.");
        return;
      }
      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error("Amount should be a valid number greater than 0.");
        return;
      }
      if (!date) {
        toast.error("Date is required.");
        return;
      }
  
      try {
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
          icon,
          category,
          amount,
          date,
        });
  
        setOpenAddExpenseModal(false);
        toast.success("expense added successfully.");
        fetchExpenseDetails();
      } catch (error) {
        console.error("Error adding expense:", error);
        toast.error(error.response?.data?.message || "Failed to add expense.");
      }
    };

    const handleDownloadExpenseDetails = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
          responseType: "blob",
        });
        const url = window.URL.createObjectURL( new Blob([response.data]))
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Expense_Details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading expense details:", error);
        toast.error("Failed to download expense details.");
      }
    };

    useEffect(() => {
      fetchExpenseDetails();
    }, []);

  return (
    <DashboardLayout>
      <div className='my-5 mx-auto max-h-screen overflow-y-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverView 
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList 
          transactions={expenseData}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id })
          }}
          onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal 
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
        >
          <DeleteAlert
          content="Are you sure you want to delete this expense details?"
          onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense