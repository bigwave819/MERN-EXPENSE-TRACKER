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

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [ dashboardData, setDashboardData] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
        
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
        if (response.data) {
          setDashboardData(response.data)
        }
    } catch (error) {
      console.error('something went wrong try again later', error);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
          icon={<IoMdCard/>}
          label="Total Balance"
          value={addThousandSeparator(dashboardData?.totalBalance || 0)}
          color="bg-primary"
          />
          <InfoCard
          icon={<LuHandCoins/>}
          label="Total Income"
          value={addThousandSeparator(dashboardData?.totalIncome || 0)}
          color="bg-green-500"
          />
          <InfoCard
          icon={<LuWalletMinimal/>}
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
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home