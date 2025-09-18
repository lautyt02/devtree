import { Router } from "express";
const router = Router()
//gets
router.get("/",(req,res)=>{
    res.send('Home')
})
router.get("/test1",(req,res)=>{
    res.send("Prueba 1")
})
//Auth
router.post("/auth/register",(req,res)=>{
    console.log(req.body)
})
export {router}