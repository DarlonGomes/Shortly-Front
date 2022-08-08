import styled from "styled-components";
import { useContext } from "react";
import { DataContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/shortly.png";

export default function Header () {
    const { userData, setUserData } = useContext(DataContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    async function userLogout (){
        if(window.confirm('Deseja sair da sua conta?')){
            setUserData(null);
            localStorage.removeItem('ShortlyToken');
            localStorage.removeItem('ShortlyName');
            toast.info('Até a próxima!',{
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
            navigate("/signin")
        }
    }
    const HeaderRender = () => {
        if(!userData){
            return(
                <HeaderContent>
                    <div className="user">
                    </div>
                    <div className="nav">
                        <p className="green" onClick={()=>navigate("/signin")}>Entrar</p>
                        <p onClick={()=>{navigate("/signup")}}>Cadastrar-se</p>                    
                    </div>
                </HeaderContent>
            )
        }if(location.pathname === '/' && userData){
            return(
                <HeaderContent>
                    <div className="user">Seja bem-vindo(a), {userData.name}</div>
                    <div className="logged-nav">
                        <p className="logged-green">Home</p>
                        <p onClick={()=> navigate("/ranking")}>Ranking</p>
                        <p onClick={()=>{userLogout()}}>Sair</p>
                    </div>
                </HeaderContent>
            )

        }if(location.pathname === '/signin'){
            return(
                <HeaderContent>
                    <div className="user">
                    </div>
                    <div className="logged-nav">
                        <p className="logged-green">Entrar</p>
                        <p onClick={()=>{navigate('/signup')}}>Cadastrar-se</p>                    
                    </div>
                </HeaderContent>
            )
        }if(location.pathname === '/signup'){
            return(
                <HeaderContent>
                    <div className="user">
                    </div>
                    <div className="logged-nav">
                        <p onClick={()=>{navigate('/signin')}}>Entrar</p>
                        <p className="logged-green">Cadastrar-se</p>                    
                    </div>
                </HeaderContent>
            )
        }if(location.pathname === '/ranking'){
            return(
                <HeaderContent>
                    <div className="user">Seja bem-vindo(a), {userData.name}</div>
                    <div className="logged-nav">
                        <p onClick={()=>{navigate("/")}}>Home</p>
                        <p className="logged-green">Ranking</p>
                        <p onClick={()=>{userLogout()}}>Sair</p>
                    </div>
            </HeaderContent>
            )
        }
    }

    return (
        <>
            <ToastContainer/>
            <Content>
            <HeaderRender />
            <Logo>
                <h1>Shortly</h1>
                <img src={logo} alt="shortly logo" />                    
            </Logo>
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

const HeaderContent = styled.div`
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

    p{
        cursor: pointer;
    }
    .logged-nav{
        width: 180px;
        display: flex;
        justify-content: space-between;
        color: #9C9C9C;
    }

    .logged-green{
        color: #5D9040;
        cursor: default;
    }
    .green{
        color: #5D9040;
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