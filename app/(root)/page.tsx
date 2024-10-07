import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {

  const currentPage = Number(page as string) || 1
  const loggedIn = await getLoggedInUser();
  
  // Fetch accounts based on the logged-in user
  const accounts = await getAccounts({ userId: loggedIn.$id });

  // Check if accounts are fetched correctly
  if (!accounts || !accounts.data || accounts.data.length === 0) {
    return <div>No accounts found.</div>; // Handle case when no accounts are available
  }

  const accountsData = accounts.data;

  // Use the provided id or fallback to the first account's appwriteItemId
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  // Fetch specific account details
  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>
         <RecentTransactions
         accounts={accountsData}
         transactions={account?.transactions}
         appwriteItemId={appwriteItemId}
         page={currentPage}
         />
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={accounts.transactions || []} // Fallback to an empty array
        banks={accountsData.slice(0, 2)} // Slicing the accountsData array
      />
    </section>
  );
};

export default Home;
