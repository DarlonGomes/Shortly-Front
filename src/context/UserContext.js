import { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({children}) => {
    const [userData, setUserData] = useState(null);

    return(
        <DataContext.Provider value = {{userData, setUserData}}>
            { children }
        </DataContext.Provider>
    )
};

export default DataProvider;