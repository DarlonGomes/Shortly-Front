import { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({children}) => {
    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);

    return(
        <DataContext.Provider value = {{data, setData, token, setToken}}>
            { children }
        </DataContext.Provider>
    )
};

export default DataProvider;