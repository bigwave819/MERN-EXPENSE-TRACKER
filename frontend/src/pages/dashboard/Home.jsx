import React, { useState, useEffect } from 'react'
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth"
import { useNavigate } from 'react-router-dom';
import InfoCard from '../../components/cards/infoCards';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { addThousandSeparator } from "../../utils/helper"
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import RecentTransactions from "../../components/Dashboard/RecentTransactions"
import { IoMdCard } from "react-icons/io"
import FinanceOverView from '../../components/Dashboard/FinanceOverView';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    recentTransaction: [],
    last30DaysExpense: { transactions: [] },
    Last60DaysIncome: { transactions: [] },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    setError(null); // Reset any previous error state

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.ADD_DATA);
      console.log("Dashboard Data:", response); // Log the response for debugging
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Something went wrong, try again later', error);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Display error message if there was an issue fetching data */}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="h-[calc(100vh-80px)] overflow-y-auto py-5 px-4">
        <div className="mx-auto max-w-screen-2xl">
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandSeparator(dashboardData?.totalBalance || 0)}
              color="bg-primary"
            />
            <InfoCard
              icon={<LuHandCoins />}
              label="Total Income"
              value={addThousandSeparator(dashboardData?.totalIncome || 0)}
              color="bg-green-500"
            />
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total expense"
              value={addThousandSeparator(dashboardData?.totalExpense || 0)}
              color="bg-red-500"
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <RecentTransactions
              transactions={dashboardData?.recentTransaction || []}
              onSeeMore={() => navigate("/expenses")}
            />
            <FinanceOverView
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
            <ExpenseTransactions
              transactions={dashboardData?.Last30DaysExpense?.transactions || []}
              onSeeMore={() => navigate("/expense")}
            />
            <Last30DaysExpenses
              data={dashboardData?.Last30DaysExpense?.transactions || []}
            />
            <RecentIncomeWithChart
              data={dashboardData?.Last60DaysIncome?.transactions.slice(0, 4) || []}
              totalIncome={dashboardData?.totalIncome || 0}
            />
            <RecentIncome
              transactions={dashboardData?.Last60DaysIncome?.transactions || []}
              onSeeMore={() => navigate('/income')}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
