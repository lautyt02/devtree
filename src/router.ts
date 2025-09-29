import { Router } from "express";
import { createUser } from "./handlers/userHandler";
const router = Router()
//gets
router.get("/", (req, res) => {
    res.send('Home')
})
router.get("/test1", (req, res) => {
    res.send("Prueba 1")
})
//Auth
router.post("/auth/register", createUser)
export { router }