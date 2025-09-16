import { app as server } from "./server"
const port =process.env.PORT || 4000

server.listen(port,()=>{
    console.log("Server working on port ",port)
})