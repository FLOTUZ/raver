"use client";

import { CheckersEarningsList, StatCard } from "@/components/admin";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-4 m-4">
      <StatCard />
      <CheckersEarningsList />
    </div>
  );
};

export default AdminPage;
