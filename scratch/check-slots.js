const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://8ebd51d4bf4b1ec06b1e2e1a1e66ed5548f0c4f40456fec26c0a8d82c2b83625:sk_ZD48vtAwcnVOqdFjOwnp-@db.prisma.io:5432/postgres?sslmode=require'
});

async function main() {
  try {
    await client.connect();
    const query = `
      SELECT s.id, s.weekday, s."startTime", s."endTime", s."scheduleType", u."firstName", u."lastName", u."mentorTypes"
      FROM "auth"."MentorSchedule" s
      JOIN "auth"."User" u ON s."mentorId" = u.id
      ORDER BY s.weekday, s."startTime"
    `;
    const res = await client.query(query);
    console.log('Live webapp mentor schedules count:', res.rows.length);
    console.log(JSON.stringify(res.rows, null, 2));
    await client.end();
  } catch (e) {
    console.log('PG error:', e.message);
  }
}
main();
