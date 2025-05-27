import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ChevronRight,
  ShoppingBag,
  Coffee,
  Smartphone,
  Utensils
} from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'expense',
    icon: ShoppingBag,
    name: 'Shopping',
    date: 'Today',
    amount: -2500,
    color: '#FF6B6B'
  },
  {
    id: 2,
    type: 'income',
    icon: ArrowDownLeft,
    name: 'Salary',
    date: 'Today',
    amount: 45000,
    color: '#4ECDC4'
  },
  {
    id: 3,
    type: 'expense',
    icon: Coffee,
    name: 'Cafe',
    date: 'Yesterday',
    amount: -850,
    color: '#45B7D1'
  },
  {
    id: 4,
    type: 'expense',
    icon: Smartphone,
    name: 'Mobile Bill',
    date: 'Yesterday',
    amount: -1200,
    color: '#96CEB4'
  }
];

const TransactionHistory = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className={`rounded-2xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`font-[Montserrat] text-[15px] font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Recent Transactions
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
              isDarkMode 
                ? 'bg-gray-700 text-[#A6E22E] hover:bg-gray-600' 
                : 'bg-[#E8F5E9] text-[#005339] hover:bg-[#D7EDE1]'
            }`}
          >
            See All
            <ChevronRight size={16} />
          </motion.button>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between p-3 rounded-xl ${
                isDarkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                  style={{ 
                    color: transaction.color,
                    background: isDarkMode 
                      ? `${transaction.color}20` 
                      : `${transaction.color}15`
                  }}
                >
                  <transaction.icon size={20} />
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {transaction.name}
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {transaction.date}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-medium ${
                transaction.amount > 0
                  ? 'text-green-500'
                  : isDarkMode 
                    ? 'text-gray-200' 
                    : 'text-gray-800'
              }`}>
                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionHistory; 