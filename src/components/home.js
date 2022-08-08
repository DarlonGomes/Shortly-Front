import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/UserContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/shortly.png";
import trophy from "../assets/trophy.png";

export default function Ranking () {
    const [ isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState()
    const navigate = useNavigate();

    const getData = async() => {
        try {
            const response = await axios.get(`https://postgres-shortly.herokuapp.com/ranking`);
            setData(response.data);
        
        setTimeout(()=>{setIsLoading(false)}, 1000)
        } catch (error) {
            return error
        }
    }
    useEffect(()=>{
        getData();
        
    },[])
    const Render = () => {
        if(isLoading){
            return(
                <>
                <Content>
                <Header>
                    <div className="user">
                    </div>
                    <div className="nav">
                        <p className="green">Entrar</p>
                        <p>Cadastrar-se</p>
                        
                    </div>
                </Header>
                <Logo>
                    <h1>Shortly</h1>
                    <img src={logo} alt="shortly logo" />                    
                </Logo>
                <Title>
                    <img src={trophy} alt="trophy" />
                    <h3>Ranking</h3>
                </Title>
                    <Rank>
                    <p><Skeleton height={20}/></p>
                    <p><Skeleton height={20}/></p>
                    <p><Skeleton height={20}/></p>
                    <p><Skeleton height={20}/></p>
                    <p><Skeleton height={20}/></p>
                    </Rank>
                    <h4>Crie sua conta para usar nosso serviço!</h4>
                </Content>
                </>
            )
        }else{
            return(
                <>
                <Content>
                <Header>
                    <div className="user"></div>
                    <div className="nav">
                        <p className="green" onClick={()=> navigate("/signin")}>Entrar</p>
                        <p>Cadastrar-se</p>
                    </div>
                </Header>
                <Logo>
                    <h1>Shortly</h1>
                    <img src={logo} alt="shortly logo" />                    
                </Logo>
                <Title>
                    <img src={trophy} alt="trophy" />
                    <h3>Ranking</h3>
                </Title>
                <Rank>
                    {data.map((e, index) => <p>{index +1}. {e.name} - {e.linksCount} links - {e.visitCount} visualizações</p>)}
                </Rank>
                <h4>Crie sua conta para usar nosso serviço!</h4>
                </Content>
                </>
            )
        }
    }


    return(
        <>
        <Render />
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

const Title = styled.div`
    display: flex;
    margin-top: 80px;
    align-items: center;
    gap: 5px;
    img{
        width: 56px;
        height: 50px;
        object-fit: contain;
    }

    h3{
        font-size: 36px;
        font-weight: 700;
        color: #000000;
    }

`;

const Rank = styled.div`
    width: 100%;
    min-height: 50px;
    background: #FFFFFF;
    border: 1px solid rgba(120, 177, 89, 0.25);
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 24px 24px 0px 0px;
    box-sizing: border-box;
    padding: 19px 40px 30px;
    margin-top: 57px;
    p{
        font-weight: 500;
        font-size: 22px;
        line-height: 28px;
        color: #000000;
    }
`;