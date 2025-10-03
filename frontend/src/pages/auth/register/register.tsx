import { isAxiosError } from "axios"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { api } from "../../../config"
import type { TUser } from "../../../types"
import { Title, Input, AuthForm } from "../components"
type TFormFields = Pick<TUser, "name" | "email" | "handle"> & {
    password: string,
    'password-confirmation': string
}
export const Register = () => {
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<TFormFields>()
    const password = watch("password")
    const handleRegister = async (formData: TFormFields) => {
        console.log(formData)
        try {
            const { data } = await api.post("/auth/register", formData)
            toast.success(data)
            reset()
        } catch (error) {
            console.log(error)
            if (isAxiosError(error) && error.response) {  
                if(error.response.data.errors){
                    toast.error("Errores de Validación en el backend. Revise la consola con F12")
                    console.error(error.response.data.errors)
                }
                else{
                    toast.error(error.response.data.error)
                }
            }
        }
    }
    return <>
        <Title title="Crear Cuenta" linkTo="/auth/login" linkText="¿Ya tenés una cuenta?. Iniciá Sesión." />
        <AuthForm id="register-form" onSubmit={handleSubmit(handleRegister)} submitValue='Crear Cuenta'>
            <Input label="Nombre" id="name" type="text" placeholder="Tu Nombre"
                inputAtributes={register("name", { required: "El Nombre es obligatorio" })}
                errorMesage={errors.name && errors.name.message} />
            <Input label="Email" id="email" type="email" placeholder="Email de Registro"
                inputAtributes={register("email",
                    {
                        required: "El Email es obligatorio",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
        </AuthForm>
    </>
}