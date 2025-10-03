import { Link } from "react-router-dom"
type TitleProps ={
    title:string,
    linkTo:string,
    linkText:string
}
export const Title = ({title,linkTo,linkText}:TitleProps)=>{
    return<>
    <h1 className=" text-4xl text-white font-bold">{title}</h1>
    <Link className="text-center text-white text-lg block mt-10" to={linkTo}>
    {linkText}
    </Link>
    </>
}