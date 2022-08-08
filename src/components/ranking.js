import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import trophy from "../assets/trophy.png";

export default function Ranking () {
    const [ isLoading, setIsLoading] = useState(true);
    const [list, setList] = useState()
    

    const getList = async() => {
        try {
            const response = await axios.get(`https://postgres-shortly.herokuapp.com/ranking`);
            setList(response.data);
        
        setTimeout(()=>{setIsLoading(false)}, 1000)
        } catch (error) {
            return error
        }
    }
    useEffect(()=>{
        setIsLoading(true);
        getList();
        
    },[])
    const Render = () => {
        if(isLoading){
            return(
                <>
                <Content>
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
                </Content>
                </>
            )
        }else{
            return(
                <>
                <Content>
                <Title>
                    <img src={trophy} alt="trophy" />
                    <h3>Ranking</h3>
                </Title>
                <Rank>
                    {list.map((e, index) => <p key={e.id}>{index +1}. {e.name} - {e.linksCount} links - {e.visitCount} visualizações</p>)}
                </Rank>
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