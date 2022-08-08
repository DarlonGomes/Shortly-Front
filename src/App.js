import { BrowserRouter, Routes, Route } from "react-router-dom"
import DataProvider from "./context/UserContext";
import Ranking from "./components/ranking";
import Home from "./components/home";
import SignIn from "./components/login";
export default function App (){
    return(
        <DataProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ranking" element={<Ranking/>} />
                    <Route path="/signin" element={<SignIn/>} />
                </Routes>
            </BrowserRouter>
        </DataProvider>
    )
}
// <Route path="/" element={<Home />} />
                    // <Route path="/ranking" element={<Ranking/>} />
                    // <Route path="/signin" element={<SignIn/>} />
                    // <Route path="/signup" element={<SignUp />} />