import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from "../../Providers/Auth"
import "./styles.css"

interface userData {
    email: string;
    password: string;
}

const Login = () => {

    const { signIn } = useAuth()

    const FormSchema = yup.object().shape({
        email: yup.string().email("Email inválido").required("Email obrigatório"),
        password: yup.string().required("Senha obrigatória"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm<userData>({
        resolver: yupResolver(FormSchema)
    })

    const submitData = (data: userData) => {
        signIn(data)
    }

    return (
        <div className="form-container">
            <h1> Faça seu login </h1>
            <form className="form" onSubmit={handleSubmit(submitData)}>
                <div className="input-container">
                    <input className="input" placeholder="Email" {...register("email")} />
                    <span style={{color: "red" , fontSize:"13px"}}> {errors.email?.message} </span>
                </div>
                <div className="input-container">
                    <input className="input" placeholder="Senha" type="password" {...register("password")} />
                    <span style={{color: "red" , fontSize:"13px"}}> {errors.password?.message} </span>
                </div>
                <button className="button submit" type="submit"> Entrar </button>
            </form>
        </div>
    )
}

export default Login;