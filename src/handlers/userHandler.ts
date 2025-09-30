import type { Request, Response } from "express"
import { validationResult } from "express-validator"
import slug from 'slug'
import { User } from "../models/User"
import { checkPasword, hashPassword } from "../utils/auth"


const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    const { email, password } = req.body
    const handle = slug(req.body.handle, "")

    const emailExists = !! await User.findOne({ email })
    const handleExists = !! await User.findOne({ handle })
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    if (emailExists) {
        const error = new Error("El email ya está en uso")
        return res.status(409).json({ error: error.message })
    }
    if (handleExists) {
        const error = new Error("El nombre de usuario ya está en uso")
        return res.status(409).json({ error: error.message })
    }
    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle
    await user.save()
    res.status(201).send(`Usuario registrado correctamente. Nombre de usuario: ${handle}`)

}

const login = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { userId, password } = req.body
    console.log(userId)
    const user = await User.findOne({ $or: [{ email: userId }, { handle: userId }] })
    console.log(user)
    if (!user) {
        const error = new Error("No existe usuario con ese email o handle")
        return res.status(404).json({ error: error.message })
    }
    const isPasswordCorrect = await checkPasword(password, user.password)
    if (!isPasswordCorrect){
        const error = new Error("Contraseña incorrecta")
        return res.status(401).json({ error: error.message })
    }
    res.status(200).send("Login exitoso")
}

export { createUser, login }