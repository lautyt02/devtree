import type { Request, Response } from "express"
import slug from 'slug'
import { User } from "../models/User"
import { hashPassword } from "../utils/auth"


export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const handle = slug(req.body.handle, "")

    const emailExists = !! await User.findOne({ email })
    const handleExists = !! await User.findOne({ handle })
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