import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdCreate } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { GiPayMoney } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdFindInPage } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AiOutlineAudit } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import "./style.css";

export const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="toggleButton"
      >
        {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "" : "hidden"}`}>
        <div className="sidebarContent">

          <div className="sectionHeader">
            <h2>Admin Dashboard</h2>
          </div>

          <nav>
            <ul className="navMenu">
              {[
                { to: "users", icon: <RiAdminFill className="navMenuItemIcon" />, label: "Admin" },
                { to: "dashboard", icon: <MdDashboard  className="navMenuItemIcon " />, label: "Dashboard" },
                { to: "createaccount", icon: <IoMdCreate className="navMenuItemIcon" />, label: "Create Account" },
                { to: "depositamount", icon: <GiPayMoney className="navMenuItemIcon" />, label: "Deposit" },
                { to: "withdrawamount", icon: <BiMoneyWithdraw className="navMenuItemIcon" />, label: "Withdraw" },
                { to: "findaccount", icon: <MdFindInPage className="navMenuItemIcon" />, label: "Find Account" },
                { to: "allconsumers", icon: <FaUsers className="navMenuItemIcon" />, label: "All Saving Accounts" },
                { to: "monthlyaudit", icon: <AiOutlineAudit className="navMenuItemIcon" />, label: "Monthly Audit" },
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `navMenuItem ${isActive ? "active" : ""}`
                    }
                  >
                    {item.icon}
                    <span className="navMenuItemLabel">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sectionHeader">
            <h2>Loan Account</h2>
          </div>

          <nav>
            <ul className="navMenu">
              {[
             
                { to: "createloanaccount", icon: <GiTakeMyMoney   className="navMenuItemIcon" />, label: "Create Loan Account" },
               
                { to: "loandeposit", icon: <GiPayMoney className="navMenuItemIcon" />, label: "Loan Deposit" },
                { to: "allloanaccount", icon: < FaUsers className="navMenuItemIcon" />, label: "All Loan Accounts" },
               
                { to: "monthlyloanaudit", icon: <AiOutlineAudit className="navMenuItemIcon" />, label: "Monthly Loan Audit" },
                
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `navMenuItem ${isActive ? "active" : ""}`
                    }
                  >
                    {item.icon}
                    <span className="navMenuItemLabel">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sectionHeader">
            <h2>Investment Account</h2>
          </div>

          <nav>
            <ul className="navMenu">
              {[
                { to: "createinvestmentaccount", icon: <FcMoneyTransfer className="navMenuItemIcon" />, label: "Create Investment Account" },
                { to: "profitofinvestment", icon: <FaMoneyBillTrendUp className="navMenuItemIcon" />, label: "Profit Of Investment" },
                { to: "allinvestmentaccount", icon: <FaUsers  className="navMenuItemIcon" />, label: "All Investment Account" },
                { to: "investmentmonthlyaudit", icon: <AiOutlineAudit className="navMenuItemIcon" />, label: "Monthly Audit" },
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `navMenuItem ${isActive ? "active" : ""}`
                    }
                  >
                    {item.icon}
                    <span className="navMenuItemLabel">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </aside>

      {/* Main Content */}
      <div className="mainContent">
        <Outlet />
      </div>
    </div>
  );
};
