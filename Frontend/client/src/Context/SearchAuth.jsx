import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios"

const SearchContext = createContext();


const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyWord:"",
        result: [],
    });


  
    
    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearch = () => useContext(SearchContext);

export {  SearchProvider,useSearch };

