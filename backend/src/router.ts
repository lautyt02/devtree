import { Router } from "express";
import { body } from 'express-validator'
import { createUser, login } from "./handlers/userHandler";
import { handleInputErrors } from "./middlewares/validation";
const router = Router()
//gets
router.get("/", (req, res) => {
    res.send('Home')
})
router.get("/test1", (req, res) => {
    res.send("Prueba 1")
})
//Auth
router.post("/auth/register",
    body('handle').notEmpty().withMessage("El handle no puede estar vacio"),
    body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
    body("email").isEmail().withMessage("Email inválido"),
    body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener un mínimo de 8 caracteres"),
    handleInputErrors,
    createUser)

router.post("/auth/login",
    body("userId").notEmpty().withMessage("Ingrese su email o su handle"),
    body("password").notEmpty().withMessage("Ingrese una contraseña"),
    handleInputErrors,
    login)
export { router }