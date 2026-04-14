import db from "#db/client";
import {createEmployee} from "#db/queries/employees"

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  await createEmployee({name: "Alice Johnson", birthday: "1990-03-15", salary: 60000 });
  await createEmployee({ name: "Bob Smith", birthday: "1985-07-22", salary: 75000 });
  await createEmployee({ name: "Carmen Rivera", birthday: "1992-11-08", salary: 55000 });
  await createEmployee({ name: "David Lee", birthday: "1988-01-30", salary: 80000 });
  await createEmployee({ name: "Eva Martinez", birthday: "1995-06-14", salary: 62000 });
  await createEmployee({ name: "Frank Chen", birthday: "1983-09-25", salary: 930000 });
  await createEmployee({ name: "Grace Kim", birthday: "1991-04-17", salary: 58000 });
  await createEmployee({ name: "Henry Patel", birthday: "1987-12-03", salary: 72000 });
  await createEmployee({ name: "Isabel Torres", birthday: "1993-08-19", salary: 65000 });
  await createEmployee({ name: "James Wilson", birthday: "1986-02-28", salary: 85000 });

}

