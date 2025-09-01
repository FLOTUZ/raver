import { NextResponse } from "next/server";

import { protectedRoute } from "@/lib";
import { prisma } from "@/prisma";

async function getSelledTickets() {
  // 1. Obtener datos de venta total
  const tickets_sold = await prisma.preRegister.count({
    where: {
      is_paid: true,
    },
  });

  const totalEarningsResult = await prisma.preRegister.aggregate({
    _sum: {
      price: true,
    },
    where: {
      is_paid: true,
    },
  });

  // Accede al valor de la suma, manejando el caso de que sea null
  const total_earnings = totalEarningsResult._sum.price ?? 0;

  // 2. Definir rangos de tiempo
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  const startOfDay = (date: Date) => new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = (date: Date) => new Date(date.setHours(23, 59, 59, 999));

  const todayStart = startOfDay(new Date(today));
  const todayEnd = endOfDay(new Date(today));
  const yesterdayStart = startOfDay(new Date(yesterday));
  const yesterdayEnd = endOfDay(new Date(yesterday));

  // 3. Consultar tickets pagados por día
  const todayTicketsCount = await prisma.preRegister.count({
    where: {
      is_paid: true,
      created_at: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  const yesterdayTicketsCount = await prisma.preRegister.count({
    where: {
      is_paid: true,
      created_at: {
        gte: yesterdayStart,
        lte: yesterdayEnd,
      },
    },
  });

  // 4. Calcular el porcentaje de cambio (trend)
  let trend = 0;

  if (yesterdayTicketsCount > 0) {
    trend =
      ((todayTicketsCount - yesterdayTicketsCount) / yesterdayTicketsCount) *
      100;
  } else if (todayTicketsCount > 0) {
    trend = 100;
  }

  // 5. Devolver la respuesta
  return NextResponse.json({
    tickets_sold,
    total_earnings: parseFloat(total_earnings.toFixed(2)),
    trend: parseFloat(trend.toFixed(2)),
  });
}

export const { GET } = protectedRoute({
  GET: getSelledTickets,
});
