import express from "express"
import {router} from "./router"
const app = express()
//Enable reading of json data
app.use(express.json())
//Routing
app.use("/",router)

export {app}