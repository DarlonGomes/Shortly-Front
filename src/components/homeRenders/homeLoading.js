import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import trophy from "../../assets/trophy.png";


export default function LoadingHome (){

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
                <h4>Crie sua conta para usar nosso serviço!</h4>
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
