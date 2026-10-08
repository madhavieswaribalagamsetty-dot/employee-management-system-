// ==========================================
// EMPLOYEE DATA
// ==========================================

async function loadEmployees() {

    const response =
        await fetch("/api/employees");

    const employees =
        await response.json();

    return employees;
}


// ==========================================
// HR - ADD EMPLOYEE
// ==========================================

const employeeForm =
    document.getElementById("employeeForm");

if (employeeForm) {

    employeeForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const employee = {

                name:
                    document.getElementById("name").value,

                email:
                    document.getElementById("email").value,

                phone:
                    document.getElementById("phone").value,

                department:
                    document.getElementById("department").value,

                role:
                    document.getElementById("role").value,

                salary:
                    document.getElementById("salary").value,

                password:
                    document.getElementById("password").value

            };

            await fetch("/api/employees", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(employee)

            });

            alert(
                "Employee added successfully!"
            );

            employeeForm.reset();

            loadHRTable();

        }
    );

}


// ==========================================
// HR TABLE
// ==========================================

async function loadHRTable() {

    const table =
        document.getElementById("employeeTable");

    if (!table) return;

    const employees =
        await loadEmployees();

    table.innerHTML = "";

    employees.forEach(employee => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.email}</td>

            <td>${employee.department}</td>

            <td>${employee.role}</td>

            <td>₹${employee.salary}</td>

            <td>${employee.attendance}</td>

            <td>${employee.leaveStatus}</td>

            <td>${employee.performance}</td>

            <td>

                <button
                    onclick="deleteEmployee(${employee.id})">
                    Delete
                </button>

            </td>

        `;

        table.appendChild(row);

    });

}


// ==========================================
// DELETE EMPLOYEE
// ==========================================

async function deleteEmployee(id) {

    await fetch(
        `/api/employees/${id}`,
        {
            method: "DELETE"
        }
    );

    alert(
        "Employee deleted successfully!"
    );

    loadHRTable();
}


// ==========================================
// ATTENDANCE
// ==========================================

async function updateAttendance() {

    const id =
        document.getElementById(
            "attendanceId"
        ).value;

    const attendance =
        document.getElementById(
            "attendanceValue"
        ).value;

    await fetch(
        `/api/employees/${id}/attendance`,
        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify({
                    attendance
                })

        }
    );

    alert(
        "Attendance updated!"
    );

    loadHRTable();
}


// ==========================================
// LEAVE MANAGEMENT
// ==========================================

async function updateLeave() {

    const id =
        document.getElementById(
            "leaveId"
        ).value;

    const status =
        document.getElementById(
            "leaveDecision"
        ).value;

    await fetch(
        `/api/employees/${id}/leave`,
        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify({
                    status
                })

        }
    );

    alert(
        "Leave status updated!"
    );

    loadHRTable();
}


// ==========================================
// PERFORMANCE
// ==========================================

async function updatePerformance() {

    const id =
        document.getElementById(
            "performanceId"
        ).value;

    const performance =
        document.getElementById(
            "performanceValue"
        ).value;

    await fetch(
        `/api/employees/${id}/performance`,
        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify({
                    performance
                })

        }
    );

    alert(
        "Performance updated!"
    );

    loadHRTable();
}


// ==========================================
// EMPLOYEE PROFILE
// ==========================================

async function viewEmployee() {

    const id =
        document.getElementById(
            "empId"
        ).value;

    const employees =
        await loadEmployees();

    const employee =
        employees.find(
            emp => emp.id == id
        );

    const profile =
        document.getElementById(
            "employeeProfile"
        );

    if (!employee) {

        profile.innerHTML =
            "<p>Employee not found.</p>";

        return;

    }

    profile.innerHTML = `

        <hr>

        <p>
            <strong>Name:</strong>
            ${employee.name}
        </p>

        <p>
            <strong>Email:</strong>
            ${employee.email}
        </p>

        <p>
            <strong>Phone:</strong>
            ${employee.phone}
        </p>

        <p>
            <strong>Department:</strong>
            ${employee.department}
        </p>

        <p>
            <strong>Role:</strong>
            ${employee.role}
        </p>

    `;

    document.getElementById(
        "employeeAttendance"
    ).innerText =
        "Attendance: " +
        employee.attendance;

    document.getElementById(
        "leaveStatus"
    ).innerText =
        "Leave Status: " +
        employee.leaveStatus;

    document.getElementById(
        "salary"
    ).innerText =
        "Salary: ₹" +
        employee.salary;

    document.getElementById(
        "performance"
    ).innerText =
        "Performance: " +
        employee.performance;

}


// ==========================================
// EMPLOYEE LEAVE APPLICATION
// ==========================================

async function applyLeave() {

    const id =
        document.getElementById(
            "empId"
        ).value;

    const reason =
        document.getElementById(
            "leaveReason"
        ).value;

    if (!id || !reason) {

        alert(
            "Enter Employee ID and leave reason."
        );

        return;

    }

    await fetch(
        `/api/employees/${id}/leave`,
        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify({
                    status:
                        "Pending - " + reason
                })

        }
    );

    document.getElementById(
        "leaveMessage"
    ).innerText =
        "Leave application submitted.";

}


// ==========================================
// ADMIN EMPLOYEE ACCOUNTS
// ==========================================

async function loadAdminEmployees() {

    const employees =
        await loadEmployees();

    const table =
        document.getElementById(
            "adminTable"
        );

    table.innerHTML = "";

    employees.forEach(employee => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.department}</td>

            <td>${employee.role}</td>

            <td>Active</td>

        `;

        table.appendChild(row);

    });

    document.getElementById(
        "totalEmployees"
    ).innerText =
        employees.length;

}


// ==========================================
// ADMIN DEPARTMENT
// ==========================================

function addDepartment() {

    const name =
        document.getElementById(
            "departmentName"
        ).value;

    if (!name) return;

    const list =
        document.getElementById(
            "departmentList"
        );

    const item =
        document.createElement("li");

    item.innerText = name;

    list.appendChild(item);

    document.getElementById(
        "departmentName"
    ).value = "";

}


// ==========================================
// ROLE ACCESS
// ==========================================

function showRole() {

    const role =
        document.getElementById(
            "roleAccess"
        ).value;

    let message = "";

    if (role === "Employee") {

        message =
            "Employee: View personal information.";

    }

    else if (role === "HR") {

        message =
            "HR: Manage employees and HR records.";

    }

    else {

        message =
            "Admin: Full system access.";

    }

    document.getElementById(
        "roleMessage"
    ).innerText =
        message;

}


// ==========================================
// NOTIFICATIONS
// ==========================================

function sendNotification() {

    const notification =
        document.getElementById(
            "notification"
        ).value;

    if (!notification) {

        alert(
            "Enter a notification."
        );

        return;

    }

    document.getElementById(
        "notificationMessage"
    ).innerText =
        "Notification sent successfully.";

}


// ==========================================
// REPORT
// ==========================================

async function generateReport() {

    const employees =
        await loadEmployees();

    const report =
        document.getElementById(
            "report"
        );

    report.innerHTML = `

        Total Employees:
        <strong>
            ${employees.length}
        </strong>

        <br>

        Report Generated Successfully.

    `;

}


// ==========================================
// AUTOMATIC LOADING
// ==========================================

loadHRTable();

loadAdminEmployees();