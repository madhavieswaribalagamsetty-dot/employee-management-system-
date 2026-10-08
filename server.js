const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const dataFile = path.join(__dirname, "data", "employees.json");

// Read employee data
function getEmployees() {
    if (!fs.existsSync(dataFile)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

// Save employee data
function saveEmployees(employees) {
    fs.writeFileSync(
        dataFile,
        JSON.stringify(employees, null, 2)
    );
}

// -----------------------------
// GET ALL EMPLOYEES
// -----------------------------

app.get("/api/employees", (req, res) => {
    res.json(getEmployees());
});

// -----------------------------
// ADD EMPLOYEE
// -----------------------------

app.post("/api/employees", (req, res) => {

    const employees = getEmployees();

    const employee = {
        id: Date.now(),

        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,

        department: req.body.department,
        role: req.body.role,

        salary: req.body.salary,

        attendance: "Present",

        leaveStatus: "No Leave Applied",

        performance: "Not Evaluated",

        password: req.body.password || "1234"
    };

    employees.push(employee);

    saveEmployees(employees);

    res.json({
        message: "Employee added successfully",
        employee: employee
    });
});

// -----------------------------
// UPDATE EMPLOYEE
// -----------------------------

app.put("/api/employees/:id", (req, res) => {

    const employees = getEmployees();

    const id = Number(req.params.id);

    const employee = employees.find(
        emp => emp.id === id
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    Object.assign(employee, req.body);

    saveEmployees(employees);

    res.json({
        message: "Employee updated successfully",
        employee: employee
    });
});

// -----------------------------
// DELETE EMPLOYEE
// -----------------------------

app.delete("/api/employees/:id", (req, res) => {

    let employees = getEmployees();

    const id = Number(req.params.id);

    employees = employees.filter(
        emp => emp.id !== id
    );

    saveEmployees(employees);

    res.json({
        message: "Employee deleted successfully"
    });
});

// -----------------------------
// APPLY LEAVE
// -----------------------------

app.put("/api/employees/:id/leave", (req, res) => {

    const employees = getEmployees();

    const employee = employees.find(
        emp => emp.id === Number(req.params.id)
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employee.leaveStatus = req.body.status;

    saveEmployees(employees);

    res.json({
        message: "Leave status updated"
    });
});

// -----------------------------
// UPDATE ATTENDANCE
// -----------------------------

app.put("/api/employees/:id/attendance", (req, res) => {

    const employees = getEmployees();

    const employee = employees.find(
        emp => emp.id === Number(req.params.id)
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employee.attendance = req.body.attendance;

    saveEmployees(employees);

    res.json({
        message: "Attendance updated"
    });
});

// -----------------------------
// PERFORMANCE
// -----------------------------

app.put("/api/employees/:id/performance", (req, res) => {

    const employees = getEmployees();

    const employee = employees.find(
        emp => emp.id === Number(req.params.id)
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employee.performance = req.body.performance;

    saveEmployees(employees);

    res.json({
        message: "Performance updated"
    });
});

// -----------------------------
// START SERVER
// -----------------------------

app.listen(PORT, () => {

    console.log(
        `Employee Management System running at http://localhost:${PORT}`
    );

});