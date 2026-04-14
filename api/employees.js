import express from "express";
import {createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee} from "#db/queries/employees"
const router = express.Router();


//This handles the welcome message
router.get("/", (req, res) => {
    res.send("Welcome to the Fullstack Employees API.")
})

//This gets all the employees
router.get("/employees", async (req, res) => {
    const employees = await getEmployees();
    res.send(employees)
})

//this creates a new employee

router.post("/employees", async (req, res) => {
    

    if(!req.body){
        return res.status(400).send("Request body is required.")
    }
    const {name, birthday, salary} = req.body;//I had this at the top out of habit and in this environment when dealing with middleware the order matters. 
    if (!name || !birthday || !salary){
        return res.status(400).send("You must complete all fields to be submitted")
    }

    const employee = await createEmployee({name, birthday, salary});
    res.status(201).send(employee);
})

//This handles the get request
router.get("/employees/:id", async(req,res) => {
    const{id} = req.params;
    const employee = await getEmployee(id);
    if(!employee){
        return res.status(404).send("Employee with specific id does not exist.")
    }
    res.send(employee);
})

//This handles the DELETE portion 
router.delete("/employees/:id", async (req, res) => {
    const{id} = req.params;
    const employee = await deleteEmployee(id);
    if(!employee){
        return res.status(404).send("That employee does not exist in our database.")
    }
    res.sendStatus(204);//If correct send 204 for a success!
})

//This will update our employee
router.put("/employees/:id", async(req, res) => {
    const{id} = req.params;
    if(!req.body) {
        return res.status(400).send("Request body is required")
    }
    const {name, birthday, salary} = req.body;
    if(!name || !birthday || !salary){
        return res.status(400).send("All fields are required.")
    }
    const employee = await updateEmployee({id, name, birthday, salary});
    if(!employee){
        return res.status(404).send("Employee does not exist/")
    }
    res.status(200).send(employee);
})


export default router;


