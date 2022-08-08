import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { DataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function SignIn () {
    const {setUserData} = useContext(DataContext);
    const [ password, setPassword] = useState("");
    const [ email, setEmail] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();

    const ButtonToggle = () =>{
        if(isDisabled === true){
            return (
                <button disabled={true} ><ThreeDots  color="#FFFFFF" height={17} width={"100%"} /></button>
            )
        }

        return(
            <button type="submit" disabled={isDisabled}>Entrar</button>
        )
    }

    async function validateLogin (event){
        event.preventDefault();
        setIsDisabled(true);
        const body = {
            email: email,
            password: password
        };
        try {
            const response = await axios.post("https://postgres-shortly.herokuapp.com/signin", body);
            setUserData({
                name: response.data.name,
                token: {headers:{
                    Authorization: `Bearer ${response.data.token}`
               }}
            });
            localStorage.setItem('ShortlyToken', JSON.stringify({headers:{
                Authorization: `Bearer ${response.data.token}`
            }}));
            localStorage.setItem('ShortlyName',JSON.stringify(response.data.name));
            setIsDisabled(false);
            navigate("/");
        } catch (error) {
            setTimeout(()=>{
                setEmail("");
                setPassword("");
                setIsDisabled(false);
                toast.error('Dados não válidos, cheque-os e tente novamente', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
            },"1000");
        }
    }

    return(
        <>
            <Content>
            <Form >
                <form onSubmit={(event) => validateLogin(event)}>
                <input
                type="email"
                value={email}
                onChange={e=> setEmail(e.target.value)}
                placeholder= "E-mail"
                required
                disabled= {isDisabled} ></input>
                <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder= "Senha"
                required
                disabled= {isDisabled} ></input>
                <ButtonToggle/>
                </form>
            </Form>
            </Content>
            </>
    )
}

const Content = styled.div`
    width: 1017px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
    font-family: 'Lexend Deca';

    h4{
        font-weight: 700;
        color: #000000;
        font-size: 36px;
        margin-top: 82px;
    }
`;


const Form = styled.div`
    form{
        width: 769px;
        font-weight: 400;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 130px;
    }
    input{
        width: 100%;
        height: 60px;
        background: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;
        color: #9C9C9C;
        margin-bottom: 25px;
        box-sizing: border-box;
        padding: 21px;
        outline: 0;
    }

    button{
        width: 182px;
        height: 60px;
        background: #5D9040;
        border-radius: 12px;
        color: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        margin-top: 68px;
        cursor: pointer;
    }
`;
