//This is the CRUD operation of using array object

const http = require("http")
const port = 8000
let student = [
    { id: 1, name: "Amrit", course: "BCA" },
    { id: 2, name: "Subha", course: "BCA" },
    { id: 3, name: "Lalu", course: "BBA" },
    { id: 4, name: "Swapan", course: "BBA" }
]
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Hello world")
    } else if (req.url === "/student") {
        res.end(JSON.stringify(student, null, 2))
    }
    else if (req.url.startsWith("/student/")) {
        const id = parseInt(req.url.split("/")[2])
        const foundStudent = student.find((s) => s.id === id)
        if (!foundStudent) {
            return res.end(
                JSON.stringify({ message: "student not found" })
            )
        }
        res.end(JSON.stringify(foundStudent, null, 2))
    }

})
server.listen(port, () => {
    console.log(`The server is running on port number. ${port}`)
})
