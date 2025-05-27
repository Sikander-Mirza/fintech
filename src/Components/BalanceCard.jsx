import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import logomini from "../assets/zenpaymini.png";
import { useTheme } from '../context/ThemeContext';

function BalanceCard() {
  const [visible, setVisible] = useState(true);
  const { isDarkMode } = useTheme();
  const [userData, setUserData] = useState({ name: "", balance: 0 });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          name: parsedUser.name || "User",
          balance: parsedUser.balance || 0
        });
      } catch (e) {
        console.error("Error parsing user data from localStorage:", e);
      }
    }
  }, []);

  return (
    <div 
      className="my-4 rounded-[24px] text-white relative overflow-hidden mx-auto"
      style={{
        width: "94%",
        maxWidth: "380px",
        height: "180px",
        background: isDarkMode 
          ? "linear-gradient(135deg, #1a4332 0%, #1c5c41 100%)"
          : "linear-gradient(135deg, #005339 0%, #00684A 100%)",
        boxShadow: isDarkMode 
          ? "0 10px 20px rgba(0, 0, 0, 0.3)"
          : "0 10px 20px rgba(0, 83, 57, 0.15)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-32 translate-y-32" />
      </div>

      {/* Top Row */}
      <div className="flex justify-between items-center px-6 pt-5 relative z-20">
        <img src={logomini} alt="Logo" className="w-8 h-8" />
        <span className="text-sm font-mono tracking-widest opacity-90">•••• 69</span>
      </div>

      {/* Balance Section */}
      <div className="flex flex-col items-start px-6 mt-4">
        <p className="text-xs opacity-80 font-[Montserrat] mb-1">Available Balance</p>

        <div className="flex items-center space-x-3 mt-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-[Montserrat] opacity-90">PKR</span>
            <h2 className="text-3xl font-semibold font-[Montserrat]">
  <h2 className="text-3xl font-semibold font-[Montserrat]">
  {visible ? userData.balance.toLocaleString() : "****"}
</h2>

</h2>

          </div>

      <button
  type="button"
  onClick={() => {
    console.log("Icon clicked", visible); // Debug log
    setVisible(!visible);
  }}
  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 cursor-pointer"
>
  {visible ? <Eye size={16} className="text-white" /> : <EyeOff size={16} className="text-white" />}
</button>

        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center px-6 absolute bottom-5 w-full text-sm">
        <span className="font-[Montserrat] text-sm opacity-90">{userData.name}</span>
        <span className="font-[Montserrat] text-xs opacity-70">Valid Thru 06/26</span>
      </div>
    </div>
  );
}

export default BalanceCard;
