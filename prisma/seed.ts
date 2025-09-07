/* eslint-disable no-console */
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const host = await prisma.host.create({
    data: {
      name: "mani.codes",
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
      id: "1",
      name: "🎃 Noche de Disfraces 2025 👻",
      description: `
¡La espera terminó! Celebremos la noche con nuestra gran **fiesta de disfraces de Halloween 2025** que no olvidarás.  

Prepárate para una noche llena de misterio, diversión y sorpresas, donde la creatividad y la magia se apoderarán del ambiente.  

✨ Habrá premios para los mejores disfraces, música, y muchas experiencias aterradoras (pero divertidas).  

Ven con tu mejor disfraz y sé parte del inicio de esta nueva etapa.  
La noche será tuya… si te atreves. 🕷️🦇  

📍 **Lugar:** Calle 123, Ciudad, País  
📅 **Fecha:** 1 de enero de 2023  
🕙 **Hora:** 10:00 AM – 12:00 PM 
    `,
      host_id: host.id,
      image:
        "https://i.pinimg.com/736x/70/18/12/701812553630321ca103c55afc93c172.jpg",
      banner:
        "https://i.pinimg.com/736x/ab/e6/34/abe634457a1419ef24dd7443a2ffdb21.jpg",
      init_date: new Date("2023-01-01T00:00:00.000Z"),
      end_date: new Date("2023-01-01T12:00:00.000Z"),
      location: "Calle 123, Ciudad, País",
      start_time: "10:00",
      end_time: "12:00",
      created_at: new Date("2023-01-01T00:00:00.000Z"),
      updated_at: new Date("2023-01-01T00:00:00.000Z"),
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
