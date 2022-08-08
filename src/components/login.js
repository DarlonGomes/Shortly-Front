import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/UserContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/shortly.png";
import { ThreeDots } from "react-loader-spinner";

export default function SignIn () {
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

    const userLogin = async() => {
        
    }

    return(
        <>
            <Content>
            <Header>
                <div className="user"></div>
                    <div className="nav">
                    <p className="green">Entrar</p>
                    <p>Cadastrar-se</p>
                </div>
            </Header>
            <Logo onClick={()=>navigate("/")}>
                <h1>Shortly</h1>
                <img src={logo} alt="shortly logo" />                    
            </Logo>
            <Form >
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

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 14px;
    margin-top: 60px;

    .user{
        color: #5D9040;
    }

    .nav{
        width: 150px;
        display: flex;
        justify-content: space-between;
        color: #9C9C9C;
    }

    .green{
        color: #5D9040;
    }
    p{
        cursor: pointer;
    }
`;

const Logo = styled.div`
    display: flex;
    margin-top:30px;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    h1{
        font-size: 64px;
        font-weight: 200;
        color: #000000;
    }

    img{
        width: 102px;
        height: 97px;
        object-fit: contain;
    }
`;

const Form = styled.form`
    width: 769px;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 130px;
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
