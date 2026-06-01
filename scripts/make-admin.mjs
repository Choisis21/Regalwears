// Promote a user to ADMIN.
// Usage: node --env-file=.env scripts/make-admin.mjs you@example.com
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const email = process.argv[2];

if (!email) {
  console.error("Usage: node --env-file=.env scripts/make-admin.mjs <email>");
  process.exit(1);
}

try {
  const user = await prisma.user.update({
    where: { email: email.toLowerCase() },
    data: { role: "ADMIN" },
  });
  console.log(`✓ ${user.email} is now ${user.role}`);
} catch (err) {
  console.error("Could not promote user:", err.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
