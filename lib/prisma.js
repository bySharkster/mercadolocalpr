const { PrismaClient } = require("@prisma/client");

let prisma;
if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "test") {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  } else {
    prisma = new PrismaClient();
  }
}

module.exports = prisma;
