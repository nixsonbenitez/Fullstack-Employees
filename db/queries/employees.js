import db from "#db/client"

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const result = await db.query(
    `INSERT INTO employees (name, birthday, salary)
     VALUES ($1, $2, $3) 
    RETURNING *`,
    [name, birthday, salary]
  );
  return result.rows[0];
}
//Await opens the connection, 
//db.query(sends the SQL to the database )
// Returning tells the databse to send back the row it just created


// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const sql = `SELECT * FROM employees`; // it is important to write const sql because that is our sql langaugae communicating with db
  const { rows: employees } = await db.query(sql); // await db sends the sql request the database
  return employees; // this returns what is in the database
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const sql = `SELECT * FROM employees where id=$1`;
  const {rows: [employee]} =
  await db.query(sql, [id]) // help me understand what is going on here 
  return employee;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const sql = `UPDATE employees 
               SET name= $1, birthday=$2, salary =$3 WHERE id= $4 RETURNING *`; 
  const {rows: [employee]} = await db.query(sql, [name, birthday, salary, id])
  return employee;
}
//interesting note, the order of values in the array must match the values inside the SQL 

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const sql = `DELETE FROM employees WHERE  id=$1 RETURNING *`
  const{rows: [employee]} =
  await db.query(sql, [id])
  return employee;

}

//The updateEmployees and deleteemployees are strictly for only talking to the database and the route in api/employees.js will handl the checking for undefined and send the 404
