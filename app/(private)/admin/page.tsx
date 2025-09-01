"use client";

import { Progress } from "@heroui/react";

import {
  CheckersEarningsList,
  StatCard,
  StatCardData,
} from "@/components/admin";
import { useQuery } from "@/hooks/useQuery";
import { Checker } from "@/interfaces";

const AdminPage = () => {
  const { data: sellledTickets, loading: loadingSelledTickets } = useQuery<
    {},
    StatCardData | null
  >({
    url: "/api/stats/selled-tickets",
  });

  const { data: checkers, loading: loadingCheckers } = useQuery<{}, Checker[]>({
    url: "/api/stats/earnings-by-checker",
  });

  if (loadingCheckers || loadingSelledTickets) {
    return (
      <Progress
        isIndeterminate
        aria-label="Loading..."
        className="w-full"
        size="sm"
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 m-4">
      <StatCard saleStats={sellledTickets} />
      <CheckersEarningsList checkers={checkers || []} />
    </div>
  );
};

export default AdminPage;
