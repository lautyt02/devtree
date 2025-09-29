import type { Request, Response } from "express"
import { User } from "../models/User"


export const createUser = async (req: Request, res: Response) => {
    const { email } = req.body
    const userExists = !! await User.findOne({ email })
    if (userExists) {
        const error = new Error("El usuario ya existe")
        return res.status(409).json({ error: error.message })
    }
    else {
        await User.create(req.body)
        res.status(201).send("Usuario registrado correctamente")
    }


}