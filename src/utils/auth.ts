import bcrypt from "bcrypt"

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

const checkPasword = async (password: string, hash: string) => {
    return await bcrypt.compare(password,hash)
}
export {hashPassword,checkPasword}