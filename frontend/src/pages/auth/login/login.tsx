import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import { api } from "../../../config"
import { Title, Input, AuthForm } from "../components"

type TLoginUser = {
    userId: string,
    password: string
}
export const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<TLoginUser>()
    const userId = watch("userId")
    const handleLogin = async (formData: TLoginUser) => {
        try {
            const { data } = await api.post("/auth/login", formData)
            toast.success(data)
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }

        }
    }
    return <>
        <Title title="Iniciar Sesión" linkTo="/auth/register" linkText="¿No tenés una cuenta?. Registrate" />
        <AuthForm id="login-form" onSubmit={handleSubmit(handleLogin)} submitValue="Iniciar Sesión"  >
            <Input label="Email o Nombre de Usuario" id="user" type="text" placeholder="Email o Nombre de Usuario"
                inputAtributes={register("userId", { required: "Email o Nombre de Usuario obligatorio" })}
                errorMesage={errors.userId && errors.userId.message} />
            {userId && <p className="bg-blue-50 text-blue-600 font-bold text-sm p-3 text-center">
                {(!!userId.match(/\S+@\S+\.\S+/)) ? "Iniciando Sesión con Email" : "No es un email Valido. Iniciando Sesion con Nombre de Usuario"}</p>}
            <Input label="Contarseña" id="password" type="password" placeholder="Contraseña"
                inputAtributes={register("password", {
                    required: "La Contraseña es obligatoria"
                })}
                errorMesage={errors.password && errors.password.message} />
        </AuthForm>
    </>
}