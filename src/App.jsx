import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBar} from "./components/NavBar";




//*---------------------------------------------------------------*
// HomeAboutContactError || Here import the All necessary Pages  //
//*---------------------------------------------------------------*
import { Home } from "./pages/HomeAboutContactError/Home";
import {Contact} from "./pages/HomeAboutContactError/Contact-page";
import {About} from "./pages/HomeAboutContactError/About";
import { Error } from "./pages/HomeAboutContactError/Error";



//*------------------------------------------------------*
// Admin Section || Here import the All necessary Pages  //
//*------------------------------------------------------*
import { Login } from "./pages/AdminAccount/Login";
import { Register } from "./pages/AdminAccount/Register";
import { Logout } from "./pages/AdminAccount/Logout";
import {AdminLayout } from "./components/Layout/Adminlayout";
import { AdminUsers } from "./pages/AdminAccount/Admin-Users";
import { AdminUpdate } from "./pages/AdminAccount/Admin-Update";


//*--------------------------------------------------*
// Saving Account || import the All necessary Pages //
//*--------------------------------------------------*

import { Dashboard} from "./pages/SavingAccount/Dash-board";
import { CreateAccount } from "./pages/SavingAccount/Create-Account";
import { DepositAmount } from "./pages/SavingAccount/DepositAmount";
import { WithdrawAmount } from "./pages/SavingAccount/WithdrawAmount";
import {FindAccounts} from "./pages/SavingAccount/FindAccount";
import { AllConsumerData } from "./pages/SavingAccount/AllConsumerData";
import { UpdateConsumerData } from "./pages/SavingAccount/AllConsumerData-Update";
import { MonthlyAuditData} from "./pages/SavingAccount/Monthly-Audit-Data";
import {ShowTransactionHistory} from "./pages/SavingAccount/Show-transaction-history";


//*------------------------------------------------*
// Loan Account || import the All necessary Pages //
//*------------------------------------------------*
import { AdminCreateLoanAccount} from "./pages/LoanAccount/Create-Loan-Account";

import {LoanDeposit} from "./pages/LoanAccount/Loan-Deposit";
import{GetAllLoanHolders}from "./pages/LoanAccount/Show-All-Loan-HoldersData"; 
import{ShowTransactionLoanHistory}from "./pages/LoanAccount/Show-Loan-transaction-history"; 
import{LoanMonthlyAudit} from "./pages/LoanAccount/Loan-Monthly-Audit"; 



//*------------------------------------------------*
// Loan Account || import the All necessary Pages //
//*------------------------------------------------*
import{AdminCreateInvestmentAccount} from "./pages/InvestmentAccount/Create-Investment-Account"; 
import{ProfitInvestment} from "./pages/InvestmentAccount/Profit-Investment"; 
import{InvestmentMonthlyAudit} from "./pages/InvestmentAccount/Investment-Monthly-Audit"; 
import{AllInvestmentAccount} from "./pages/InvestmentAccount/All-Investment-Account"; 
import{ShowInvestMentTransactionHistory} from "./pages/InvestmentAccount/Show-Investment-Transaction-History"; 


const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar/>
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
              
             

              <Route path="createloanaccount" element={<AdminCreateLoanAccount/>} />
              
              <Route path="loandeposit" element={<LoanDeposit/>} />
              <Route path="allloanaccount" element={<GetAllLoanHolders/>} />
              <Route path="monthlyloanaudit" element={<LoanMonthlyAudit/>} />
              <Route path="allinvestmentaccount" element={<AllInvestmentAccount/>} />
              <Route path="transactionloanhistory/:account_no/loandatafetch" element={<ShowTransactionLoanHistory />} />
              
           
           <Route path="createinvestmentaccount" element={<AdminCreateInvestmentAccount/>} />
           <Route path="profitofinvestment" element={<ProfitInvestment/>} />
           <Route path="investmentmonthlyaudit" element={<InvestmentMonthlyAudit/>} />
           <Route path="transactioninvestnhistory/:account_no/investdatafetch" element={<ShowInvestMentTransactionHistory />} />

          
              <Route path="users/:id/edit" element={<AdminUpdate />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="createaccount" element={<CreateAccount />} />
              <Route path="depositamount" element={<DepositAmount />} />
              <Route path="withdrawamount" element={<WithdrawAmount />} />
              <Route path="allconsumers" element={<AllConsumerData />} />
              <Route path="monthlyaudit" element={< MonthlyAuditData />} />
             <Route path="findaccount" element={<FindAccounts />} />
              <Route path="allConsumers/:id/edit" element={<UpdateConsumerData />} />
              <Route path="transactionhistory/:account_no/datafetch" element={<ShowTransactionHistory />} />
            </Route>


            <Route path="/admin/*" element={<AdminLayout />}></Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
