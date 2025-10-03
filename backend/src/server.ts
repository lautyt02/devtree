import express from "express"
import 'dotenv/config'
import cors from "cors"
import {router} from "./router"
import { connectDB, corsConfig } from "./config"
const app = express()
connectDB()
//Set CORS
app.use(cors(corsConfig))
//Enable reading of json data
app.use(express.json())
//Routing
app.use("/",router)

export {app}