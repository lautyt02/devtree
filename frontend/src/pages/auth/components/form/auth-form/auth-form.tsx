type AuthFormProps = {
    id: string,
    onSubmit: () => {},
    submitValue: string,
    children: React.ReactNode
}
export const AuthForm = ({ id, submitValue, children, onSubmit }: AuthFormProps) => {

    return <form id={id}
            onSubmit={onSubmit}
            className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            noValidate
            >
                {children}
                <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value={submitValue}
                />
            </form>
}