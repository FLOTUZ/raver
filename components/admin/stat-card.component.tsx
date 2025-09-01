import { useQuery } from "@/hooks/useQuery";
import { FaArrowUp, FaTicketAlt } from "react-icons/fa";

interface StatCardData {
  tickets_sold: number;
  total_earnings: number;
  trend: number;
}
export const StatCard = () => {
  const { data } = useQuery<{}, StatCardData | null>({
    url: "/api/stats/selled-tickets",
  });

  if (!data) {
    return <div>No data</div>;
  }
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tickets Vendidos</h2>
        <FaTicketAlt className="text-3xl" />
      </div>
      <div className="flex items-end mb-2">
        <p className="text-5xl font-extrabold">{data.tickets_sold}</p>
        <div
          className={`ml-2 flex items-center ${data.trend >= 0 ? "text-green-300" : "text-red-300"}`}
        >
          <FaArrowUp
            className={`transform ${data.trend < 0 ? "rotate-180" : ""}`}
          />
          <span className="text-sm ml-1">{Math.abs(data.trend)}%</span>
        </div>
      </div>
      <p className="text-lg opacity-80">Ganancias: ${data.total_earnings}</p>
    </div>
  );
};
