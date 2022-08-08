import { BrowserRouter, Routes, Route } from "react-router-dom"
import DataProvider from "./context/UserContext";
import Ranking from "./components/ranking";
import Home from "./components/home";
import SignIn from "./components/login";
import SignUp from "./components/register";
import Header from "./components/shared/header";
export default function App (){
    return(
        <DataProvider>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ranking" element={<Ranking/>} />
                    <Route path="/signin" element={<SignIn/>} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </DataProvider>
    )
}
// <Route path="/" element={<Home />} />
