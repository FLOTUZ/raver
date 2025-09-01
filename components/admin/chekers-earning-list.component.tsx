import { Checker } from "@/interfaces";
import { useState } from "react";
import { FaMoneyBillWave, FaUserCircle } from "react-icons/fa";

export const CheckersEarningsList = () => {
  const [checkers, setCheckers] = useState<Checker[]>([]);
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4 text-gray-800">
        <h2 className="text-xl font-bold">Dinero Recibido por Chequeador</h2>
        <FaMoneyBillWave className="text-3xl text-green-500" />
      </div>
      <ul className="divide-y divide-gray-200">
        {checkers.map((checker) => (
          <li
            key={checker.id}
            className="py-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <FaUserCircle className="text-4xl text-gray-400 mr-4" />
              <div>
                <p className="font-semibold text-lg text-gray-900">
                  {checker.user.name}
                </p>
                <p className="text-sm text-gray-500">{checker.user.role}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              ${checker.amount.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
