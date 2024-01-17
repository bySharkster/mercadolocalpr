import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const response = await sql`SELECT version()`;
  console.log(response);

  res.status(200).json({
    data: response,
  });
}