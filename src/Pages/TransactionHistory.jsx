import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import profileimg from '../assets/profileimg.png';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ChevronRight,
  ShoppingBag,
  Coffee,
  Smartphone,
  Utensils,
  Calendar,
  Filter,
  CreditCard,
  Gift,
  DollarSign,
  Banknote,
  Wallet,
  Bus,
  Car,
  Plane,
  Home,
  Wifi,
  BookOpen,
  Moon,
  Sun,
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import BudgetModule from '../Components/BudgetModule';
import BudgetCard from '../Components/BudgetCard';

// Sample data for the graph
const graphData = [
  { date: 'Mon', amount: 50 },   // 50%
  { date: 'Tue', amount: 25 },  // 25%
  { date: 'Wed', amount: 70 },  // 70%
  { date: 'Thu', amount: 40 },  // 40%
  { date: 'Fri', amount: 90 },  // 90%
  { date: 'Sat', amount: 60 },  // 60%
  { date: 'Sun', amount: 30 },  // 30%
];

// Sample transactions with more variety
const dummyTransactions = [
  {
    id: 1,
    type: 'transfer',
    icon: ShoppingBag,
    name: 'Shopping',
    date: 'Today',
    amount: -2500,
    color: '#FF6B6B',
    category: 'shopping'
  },
  {
    id: 2,
    type: 'deposit',
    icon: ArrowDownLeft,
    name: 'Salary',
    date: 'Today',
    amount: 45000,
    color: '#4ECDC4',
    category: 'salary'
  },
  {
    id: 3,
    type: 'transfer',
    icon: Coffee,
    name: 'Cafe',
    date: 'Today',
    amount: -850,
    color: '#45B7D1',
    category: 'food'
  },
  {
    id: 4,
    type: 'transfer',
    icon: Smartphone,
    name: 'Mobile Bill',
    date: 'Yesterday',
    amount: -1200,
    color: '#96CEB4',
    category: 'utilities'
  },
  {
    id: 5,
    type: 'transfer',
    icon: Utensils,
    name: 'Restaurant',
    date: 'Yesterday',
    amount: -1500,
    color: '#FF9F43',
    category: 'food'
  },
  {
    id: 6,
    type: 'transfer',
    icon: CreditCard,
    name: 'Credit Card Payment',
    date: 'Yesterday',
    amount: -5000,
    color: '#6C5CE7',
    category: 'finance'
  },
  {
    id: 7,
    type: 'deposit',
    icon: Gift,
    name: 'Gift Received',
    date: '2 days ago',
    amount: 2000,
    color: '#FF9FF3',
    category: 'gift'
  },
  {
    id: 8,
    type: 'transfer',
    icon: Bus,
    name: 'Bus Fare',
    date: '2 days ago',
    amount: -150,
    color: '#54A0FF',
    category: 'transport'
  },
  {
    id: 9,
    type: 'transfer',
    icon: Wifi,
    name: 'Internet Bill',
    date: '3 days ago',
    amount: -2000,
    color: '#00D2D3',
    category: 'utilities'
  },
  {
    id: 10,
    type: 'deposit',
    icon: DollarSign,
    name: 'Freelance Work',
    date: '3 days ago',
    amount: 8000,
    color: '#1DD1A1',
    category: 'income'
  },
  {
    id: 11,
    type: 'transfer',
    icon: Car,
    name: 'Fuel',
    date: '3 days ago',
    amount: -1800,
    color: '#FF9F43',
    category: 'transport'
  },
  {
    id: 12,
    type: 'transfer',
    icon: Home,
    name: 'Rent',
    date: '4 days ago',
    amount: -15000,
    color: '#6C5CE7',
    category: 'housing'
  },
  {
    id: 13,
    type: 'deposit',
    icon: Banknote,
    name: 'Investment Returns',
    date: '4 days ago',
    amount: 3500,
    color: '#4ECDC4',
    category: 'investment'
  },
  {
    id: 14,
    type: 'transfer',
    icon: BookOpen,
    name: 'Books',
    date: '5 days ago',
    amount: -1200,
    color: '#45B7D1',
    category: 'education'
  },
  {
    id: 15,
    type: 'transfer',
    icon: Plane,
    name: 'Flight Tickets',
    date: '5 days ago',
    amount: -8500,
    color: '#54A0FF',
    category: 'travel'
  }
];

const TransactionHistory = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [budgetTotal, setBudgetTotal] = useState(100000);
  const [budgetSpent, setBudgetSpent] = useState(45000);
  const [budgets, setBudgets] = useState([]);

  // Simulate API call
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In real implementation, this would be an API call
        // const response = await fetch('/api/transactions');
        // const data = await response.json();
        
        setTransactions(dummyTransactions);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Filter transactions based on category
  const filteredTransactions = selectedCategory === 'all' 
    ? transactions 
    : transactions.filter(t => t.category === selectedCategory);

  // Calculate max amount for graph scaling
  const maxAmount = Math.max(...graphData.map(d => d.amount));

  // Calculate total deposits and transfers
  const totals = transactions.reduce((acc, curr) => {
    if (curr.type === 'deposit') {
      acc.deposits += curr.amount;
    } else {
      acc.transfers += Math.abs(curr.amount);
    }
    return acc;
  }, { deposits: 0, transfers: 0 });

  const handleBudgetUpdate = (update) => {
    switch (update.type) {
      case 'add':
        setBudgetTotal(prev => prev + update.budget.amount);
        break;
      case 'edit':
        const oldBudget = budgets.find(b => b.id === update.budget.id);
        if (oldBudget) {
          setBudgetTotal(prev => prev - oldBudget.amount + update.budget.amount);
        }
        break;
      case 'delete':
        const deletedBudget = budgets.find(b => b.id === update.budgetId);
        if (deletedBudget) {
          setBudgetTotal(prev => prev - deletedBudget.amount);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Top Header Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className={`font-[Montserrat] font-semibold text-xl ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Transactions & Budget
                </h1>
              </motion.div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-400' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={profileimg} 
                  alt="Profile" 
                  className={`w-12 h-12 rounded-full object-cover shadow-md ring-2 ${
                    isDarkMode ? 'ring-gray-700' : 'ring-white'
                  }`}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <BudgetCard budgetTotal={budgetTotal} budgetSpent={budgetSpent} />
          <BudgetModule onBudgetUpdate={handleBudgetUpdate} />
        </div>

        {/* Summary Cards */}
        <div className="flex gap-4 p-4 overflow-x-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex-1 min-w-[200px] rounded-2xl p-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-sm`}
          >
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Deposits</p>
            <p className={`text-xl font-semibold ${isDarkMode ? 'text-[#A6E22E]' : 'text-[#005339]'}`}>
              {totals.deposits.toLocaleString()}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`flex-1 min-w-[200px] rounded-2xl p-4 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-sm`}
          >
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Transfers</p>
            <p className={`text-xl font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
              {totals.transfers.toLocaleString()}
            </p>
          </motion.div>
        </div>

        {/* Graph Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`m-4 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-sm`}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Balance Overview
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Last 7 days
              </p>
            </div>
            <div className="flex gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPeriod('week')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedPeriod === 'week' 
                    ? (isDarkMode ? 'bg-[#A6E22E] text-gray-800' : 'bg-[#005339] text-white')
                    : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600')
                }`}
              >
                Week
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPeriod('month')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedPeriod === 'month'
                    ? (isDarkMode ? 'bg-[#A6E22E] text-gray-800' : 'bg-[#005339] text-white')
                    : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600')
                }`}
              >
                Month
              </motion.button>
            </div>
          </div>

          {/* Graph */}
          <div className="h-48 flex items-end justify-between gap-2 mt-4">
            {graphData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max((data.amount / maxAmount) * 100, 10)}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`w-full rounded-t-lg ${
                    isDarkMode ? 'bg-[#A6E22E]' : 'bg-[#005339]'
                  }`}
                  style={{ minHeight: '12px' }}
                />
                <span className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{data.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`m-4 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-sm`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Recent Transactions
            </h2>
            <div className="flex gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Calendar size={18} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Filter size={18} />
              </motion.button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005339]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ 
                        background: isDarkMode 
                          ? `${transaction.color}30`
                          : `${transaction.color}20`,
                        color: transaction.color
                      }}
                    >
                      <transaction.icon size={20} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {transaction.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${
                      transaction.type === 'deposit' 
                        ? (isDarkMode ? 'text-[#A6E22E]' : 'text-[#005339]')
                        : (isDarkMode ? 'text-red-400' : 'text-red-500')
                    }`}>
                      {transaction.type === 'deposit' ? '+' : ''}{transaction.amount.toLocaleString()}
                    </span>
                    <ChevronRight size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default TransactionHistory; 