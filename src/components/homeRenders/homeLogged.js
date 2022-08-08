import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import trash from "../../assets/trash.png";
import {toast} from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { DataContext } from "../../context/UserContext";
export default function LoggedHome ({list, token, getUserList}){
    const [url, setUrl] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    async function createShortUrl (event){
        event.preventDefault();
        setIsDisabled(true);
        const body = {
            url:url
        }
        try {
            await axios.post(`https://postgres-shortly.herokuapp.com/urls/shorten`, body, token);
            setTimeout(()=>{
                getUserList();
            toast.success("Link redirecionado para o bolso.",{
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
            setIsDisabled(false);
            }, 1000)
        } 
        catch (error) {
            return error;
        }
    }
    async function deleteUrl (element){
        try {
            if(window.confirm("Deseja excluir essa mensagem?")){
                await axios.delete(`https://postgres-shortly.herokuapp.com/urls/${element}`, token)
                toast.success("Link deletado!",{
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                })
                getUserList();
            }
        } catch (error) {
            console.log(error)
            toast.error(`${error.message}`,{
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        }
    }
    const ButtonToggle = () =>{
        if(!isDisabled){
            return(
                    <button type="submit" disabled={isDisabled}>
                    Encurtar link
                    </button>
            )
        }else{
            return(
                <button disabled={isDisabled}><ThreeDots  color="#FFFFFF" height={17} width={"100%"} /></button>
            )
        }
    }

    const UserLinks = () =>{
        if(list.shortenedUrls[0].id === null){
            return(
                <>
                <p> Você não possui links encurtados.</p>
                </>
            )
        }else{
            return(
                <>
                {list.shortenedUrls.map(e => <Display key={e.id}>
                    <div className="linkData">
                    <p>{e.url}</p>
                    <p>{e.shortUrl}</p>
                    <p>Quantidade de visitas: {e.visitCount}</p>
                    </div>
                    <div className="deleteLink" onClick={()=>{deleteUrl(e.id)}}>
                    <img src={trash} alt="trash icon"/>
                    </div>
                </Display>)}
                </>
            )
        }
    }
    
return(
    <>
        <Content>
            <Shorten>
                <form onSubmit={(event)=>createShortUrl(event)}>
                    <input
                    type="text"
                    value={url}
                    onChange={e=> setUrl(e.target.value)}
                    placeholder= "Link que cabem no bolso"
                    required
                    disabled= {isDisabled}>
                    </input>
                    <ButtonToggle/>
                </form>
            </Shorten>
            <UserLinks />
        </Content>
    </>
)
};
const Shorten = styled.div`
    width: 100%;
    margin: 140px 0 59px;
    form{
        display: flex;
        justify-content: space-between;
    }

    input{
        width: 769px;
        height: 60px;
        background: #FFFFFF;
        border: 1px solid rgba(120, 177, 89, 0.25);
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px;
        outline: 0;
        box-sizing: border-box;
        padding: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #9C9C9C;
    }
    button{
        width: 182px;
        height: 60px;
        background-color: #5D9040;
        border-radius: 12px;
        border: none;
        font-size: 14px;
        font-weight: 700;
        color: #FFFFFF;
    }
`;
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

    p{
        font-weight: 300;
        font-size: 20px;

    }
`;
const Display = styled.div`
    display: flex;
    margin-bottom: 42px;
    .linkData{
        width: 887px;
        height: 60px;
        background: #80CC74;
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 12px 0px 0px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 0 0  25px;
    }
    p{
        flex: 1 1 0;
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
    }
    .deleteLink{
        width: 130px;
        height: 60px;
        background: #FFFFFF;
        box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
        border-radius: 0px 12px 12px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img{
        width: 22px;
        height: 26px;
        object-fit: contain;
    }
`;