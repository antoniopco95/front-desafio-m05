import { createContext, useCallback, useContext, useState } from "react";

const ClientsContext = createContext();

export function ClientsProvider({ children }) {
    const [clientsData, setClientsData] = useState([]);

    const addClient = (newClient) => {
        setClientsData((prevData) => [...prevData, newClient]);
    };

    const updateClientsData = useCallback((newData) => {
        setClientsData(newData);
    }, []);

    return (
        <ClientsContext.Provider value={{ clientsData, addClient, updateClientsData }}>
            {children}
        </ClientsContext.Provider>
    );
}

export function useClients() {
    return useContext(ClientsContext);
}