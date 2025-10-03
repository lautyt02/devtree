import { isAxiosError } from "axios"
import { toast } from "sonner"
import type { TUser } from "../../../types"
import { api } from "../../../config"
import { Title, Input } from "../components"
import { useForm } from "react-hook-form"
type TFormFields = Pick<TUser, "name" | "email" | "handle"> & {
    password: string,
    'password-confirmation': string
}
export const Register = () => {
    const { register, watch, handleSubmit,reset, formState: { errors } } = useForm<TFormFields>()
    const password = watch("password")
    const handleRegister = async (formData: TFormFields) => {
        try {
            const {data} =await api.post("/auth/register",formData)
            toast.success(data)
            reset()
        } catch (error) {
            if(isAxiosError(error)&&error.response){
                toast.error(error.response.data.error)
            }
            
        }
    }
    return <>
        <Title title="Crear Cuenta" linkTo="/auth/login" linkText="¿Ya tenés una cuenta?. Iniciá Sesión." />
        <form id="register-form"
            onSubmit={handleSubmit(handleRegister)}
            className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10">
            <Input label="Nombre" id="name" type="text" placeholder="Tu Nombre"
                inputAtributes={register("name", { required: "El Nombre es obligatorio" })}
                errorMesage={errors.name && errors.name.message} />
            <Input label="Email" id="email" type="email" placeholder="Email de Registro"
                inputAtributes={register("email",
                    {
                        required: "El Email es obligatorio",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "email inválido"
                        }
                    })}
                errorMesage={errors.email && errors.email.message} />
            <Input label="Nombre de Usuario" id="handle" type="text" placeholder="Nombre de usuario: sin espacios"
                inputAtributes={register("handle", { required: "El Nombre de Usuario es obligatorio" })}
                errorMesage={errors.handle && errors.handle.message} />
            <Input label="Contarseña" id="password" type="password" placeholder="Contraseña"
                inputAtributes={register("password", {
                    required: "La Contraseña es obligatoria",
                    minLength: {
                        value: 8,
                        message: "La Contraseña debe ser de mínimo 8 caracteres"
                    }
                })}
                errorMesage={errors.password && errors.password.message} />
            <Input label="Repetir Contarseña" id="password-confirmation" type="password" placeholder="Repetí tu Contraseña"
                inputAtributes={register("password-confirmation",
                    {
                        required: "La Confirmación es obligatoria",
                        validate: (value) => value === password || "Las contraseñas no coinciden"

                    })}
                errorMesage={errors["password-confirmation"] && errors["password-confirmation"].message} />
            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Crear Cuenta'
            />
        </form>
    </>
}