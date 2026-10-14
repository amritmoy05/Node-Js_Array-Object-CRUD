// Node Js CRUD operations using Array Object
const http = require("http")
const port = 8001
let student = [
    { id: 1, name: "Amrit", course: "BCA" },
    { id: 2, name: "Subha", course: "BCA" },
    { id: 3, name: "Lalu", course: "BBA" },
    { id: 4, name: "Swapan", course: "BBA" }
]
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end(JSON.stringify(student, 1, 1))
    } else if (req.url.startsWith("/student/")) {
        const id = parseInt(req.url.split("/")[2])
        const foundStudent = student.find((s) => s.id === id)
        if (!foundStudent) {
            res.end("Opps..!! Student data is not found..:(")
        }
        else {
            res.end(JSON.stringify(foundStudent))
        }
    }
    else if (req.url.startsWith("/update/")) {
        const id = (req.url.split("/")[2])
        const foundStudent = student.find((s) => s.id === id)
        if (!foundStudent) {
        res.statusCode = 404;
        return res.end(JSON.stringify({
            message: "Student not found"
        }));
    } else {
        res.statusCode = 200;
        return res.end(JSON.stringify({ message: "Student found", student: foundStudent }));
    }
}})
server.listen(port, () => {
    console.log(`The server is running on port no. ${port}`)
})