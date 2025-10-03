type InputProps = {
    label: string,
    id: string,
    type: string,
    placeholder: string,
    inputAtributes?: {},
    errorMesage?:React.ReactNode
}
export const Input = ({ label, id, type, placeholder, inputAtributes, errorMesage }: InputProps) => {
    return <div className="grid grid-cols-1 space-y-3">
        <label htmlFor={id} className="text-2xl text-slate-500">
            <p>{label}</p>
            <input id={id} type={type} placeholder={placeholder}
                className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400 w-full"
                {...inputAtributes}
            />
        </label>
        {errorMesage&&<p className="bg-red-50 text-red-600 font-bold text-sm p-3 uppercase text-center">{errorMesage}</p>}
    </div>
}