"use client";

import { CheckersEarningsList, StatCard } from "@/components/admin";

const AdminPage = () => {
  return (
    <>
      <StatCard ticketsSold={0} totalEarnings={0} trend={0} />
      <CheckersEarningsList />
    </>
  );
};

export default AdminPage;
