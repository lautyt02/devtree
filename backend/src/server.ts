import express from "express"
import 'dotenv/config'
import {router} from "./router"
import { connectDB } from "./config/db"
const app = express()
connectDB()
//Enable reading of json data
app.use(express.json())
//Routing
app.use("/",router)

export {app}