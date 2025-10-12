"use client";

import { Button, Progress } from "@heroui/react";
import { IoMdLogOut } from "react-icons/io";

import {
  CheckersEarningsList,
  StatCard,
  StatCardData,
} from "@/components/admin";
import { useQuery } from "@/hooks/useQuery";
import { Checker } from "@/interfaces";
import { useAdminAuth } from "@/providers";

const AdminPage = () => {
  const { logout } = useAdminAuth();
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
      <Button
        isIconOnly
        className="self-end"
        color="danger"
        variant="solid"
        onPress={logout}
      >
        <IoMdLogOut />
      </Button>
      <StatCard saleStats={sellledTickets} />
      <CheckersEarningsList checkers={checkers || []} />
    </div>
  );
};

export default AdminPage;
