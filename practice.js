
const http = require("http")
const port = 8000

let student = [
    { id: 1, name: "Amrit", course: "BCA" },
    { id: 2, name: "Subha", course: "BCA" },
    { id: 3, name: "Lalu", course: "BBA" },
    { id: 4, name: "Swapan", course: "BBA" }
]

const server = http.createServer((req, res) => {

    // Read all students
    if (req.url === "/student") {
        res.end(JSON.stringify(student, null, 2))
    }
    // Read single student
    else if (req.method === "GET" && req.url.startsWith("/student/")) {
        const id = Number(req.url.split("/")[2])
        const foundStudent = student.find((s) => s.id === id)
        if (!foundStudent) {
            res.statusCode = 404
            return res.end("Student not found")
        }
        res.end(JSON.stringify(foundStudent))
    }
    // Update student
    else if (req.method === "PUT" && req.url.startsWith("/update/")) {
        const id = Number(req.url.split("/")[2])
        const foundStudent = student.find((s) => s.id === id)
        if (!foundStudent) {
            res.statusCode = 404
            return res.end("Student not found")
        }
        let body = ""
        req.on("data", (chunk) => {
            body += chunk.toString()
        })
        req.on("end", () => {
            const newData = JSON.parse(body)
            foundStudent.name = newData.name
            foundStudent.course = newData.course
            res.end(JSON.stringify({
                message: "Student updated successfully",
                student: foundStudent
            }))
        })
    }
    else {
        res.statusCode = 404
        res.end("Route not found")
    }
})
server.listen(port, () => {
    console.log(`The server is running on port no. ${port}`)
})
