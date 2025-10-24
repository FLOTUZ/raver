import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const host = await prisma.host.create({
    data: {
      name: "michi.fiestas",
    },
  });

  console.log("✅ Host created");
  // Crear User

  await prisma.user.create({
    data: {
      email: "mani@manicodes.com",
      name: "Emmanuel Esquivel",
      role: Role.ADMIN,
      password: await bcrypt.hash("mani.codes", 10),
      host_id: host.id,
    },
  });

  const checker = await prisma.user.create({
    data: {
      email: "sarahi@manicodes.com",
      name: "Sarahi Esquivel",
      role: Role.CHEKER,
      password: await bcrypt.hash("sarahi.codes", 10),
      host_id: host.id,
    },
  });

  await prisma.checker.create({
    data: {
      amount: 0,
      user_id: checker.id,
    },
  });

  console.log("✅ Users created");
  // Crear Event
  await prisma.event.create({
    data: {
      name: "🎃 Noche de Disfraces 2025 👻",
      description: `
# 🎃👻 ¡La Fiesta de Disfraces ya está aquí! 👻🎃

- 📅 **Sábado 25 de octubre**  
- 📍 **Calle Nazareth #38, Col. Ampliación Valle del Real**  
- 🕕 **6:00 pm – 12:30 am**  
- 💸 **Cover: $120**  

---

### ✨ Actividades
- Concurso de disfraces con premios  
- Actividades recreativas y sociales  
- Shots de cortesía  
- Música y ambiente garantizado  

---

⚠ **Disfraz obligatorio**
---

🕷 **¡No faltes, será una fiesta de miedo!**
    `,
      host_id: host.id,
      image:
        "https://manicodes-public.s3.us-east-2.amazonaws.com/fiesta-de-disfrases.jpeg",
      banner:
        "https://manicodes-public.s3.us-east-2.amazonaws.com/fiesta-de-disfrases.jpeg",
      init_date: new Date("2025-10-25T18:00:00.000Z"),
      end_date: new Date("2025-10-26T00:30:00.000Z"),
      location: "Calle Nazareth #38, Col. Ampliación Valle del Real",
      start_time: "18:00",
      end_time: "00:30",
    },
  });

  console.log("✅ Event created");

  console.log("🚀 Database has been seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
