import http from "http"

const PORT = process.env.PORT || 5000
const httpServer = http.createServer((req, res) => {

})

httpServer.on("connection", stream => console.log(stream))
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))