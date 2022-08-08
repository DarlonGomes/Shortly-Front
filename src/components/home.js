import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/UserContext";

import LoadingHome from "./homeRenders/homeLoading";
import RankingHome from "./homeRenders/homeRank";
import LoggedHome from "./homeRenders/homeLogged";

export default function Ranking () {
    const {userData, setUserData} = useContext(DataContext);
    const [ renderState, setRenderState] = useState("loading")
    const [list, setList] = useState();

    const getList = async() => {
        try {
            
            const response = await axios.get(`https://postgres-shortly.herokuapp.com/ranking`);
            setList(response.data);
        setTimeout(()=>{setRenderState("withoutLogin")}, 1000)
        } catch (error) {
            return error
        }
    }

    const getUserList = async() => {
        
        try {
            const response = await axios.get(`https://postgres-shortly.herokuapp.com/users/me`, JSON.parse(localStorage.getItem('ShortlyToken')))
            setList(response.data);
            setRenderState("withLogin");
        } catch (error) {
            return error
        }
    }
    const getToken = async () => {
        
        switch (true) {
            case userData === null:
                const token = JSON.parse(localStorage.getItem('ShortlyToken'));
                const name = JSON.parse(localStorage.getItem('ShortlyName'));
                if(token && name){                
                    await setUserData({
                        name: name,
                        token: token
                    })
                    setRenderState("loggedIn-loading");
                    return true
                }else{
                    return false
                }
            case userData != null:
                return true
            default:
                return false;
        }
        
    }

     async function homepageRender () {
        setRenderState("loading")
        const result = await getToken();
        if(result === true){
            await getUserList();
        }else{
            getList();
        }
    }
    useEffect(()=>{
        homepageRender();
    },[])

    const Render = () => {
        switch (true) {
            case renderState === "withoutLogin":
                return(
                <RankingHome list={list}/>
                )
            
            case renderState === "withLogin":
                return(
                    <LoggedHome list={list} token={userData.token} getUserList={getUserList}/>
                )
            default:
                return(
                    <LoadingHome/>
                )
        }
    }


    return(
        <>
        <Render />
        </>
    )
}



