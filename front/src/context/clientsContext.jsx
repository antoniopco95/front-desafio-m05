/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState } from "react";
import { getItem } from "../utils/storage";
import registerUserFecth from "../axios/config";
const ClientsContext = createContext();

export function ClientsProvider({ children }) {

    const [clientsData, setClientsData] = useState([]);
    const [chargesData, setChargesData] = useState([]);
    const [chargesExpired, setChargesExpired] = useState([]);
    const [chargesDue, setChargesDue] = useState([]);
    const [chargeType, setChargeType] = useState(null);
    const [home, setHome] = useState(true);
    const [clients, setClients] = useState(false);
    const [charges, setCharges] = useState(false);
    const [allcharges, setAllCharges] = useState('');
    const [clientStatus, setClientStatus] = useState(null);
    const [allStatus, setAllStatus] = useState('');

    const addClient = (newClient) => {
        setClientsData((prevData) => [...prevData, newClient]);
    };

    const updateClientsData = useCallback((newData) => {
        setClientsData(newData);
    }, []);

    const updateChargesData = useCallback((newData) => {
        setChargesDue(newData);
    }, []);

    const updateChargeType = useCallback((newChargeType) => {
        setChargeType(newChargeType);
    }, []);

    const resetAllCharge = useCallback((resetCharges) => {
        setAllCharges(resetCharges);
    }, []);

    const updateClientStatus = useCallback((newClientStatus) => {
        setClientStatus(newClientStatus);
    }, []);

    const resetAllStatus = useCallback((resetStatus) => {
        setAllStatus(resetStatus);
    }, []);

    async function getAllCharges() {
        const token = getItem("token");
        try {
            const response = await registerUserFecth.get("/cobrancas", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setChargesData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function formatCPF(cpf) {
        const cleanedCPF = cpf.replace(/\D/g, "");

        const formattedCPF = cleanedCPF.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
        );

        return formattedCPF;
    }


    return (
        <ClientsContext.Provider value={{
            clientsData,
            addClient,
            updateClientsData,
            updateChargesData,
            chargesDue,
            setChargesDue,
            chargeType,
            updateChargeType,
            setChargeType,
            home,
            setHome,
            clients,
            setClients,
            charges,
            setCharges,
            allcharges,
            setAllCharges,
            resetAllCharge,
            formatCPF,
            clientStatus,
            setClientStatus,
            updateClientStatus,
            allStatus,
            setAllStatus,
            resetAllStatus,
            getAllCharges,
            setChargesData,
            chargesData,
            chargesExpired,
            setChargesExpired
        }}>
            {children}
        </ClientsContext.Provider>
    );
}

export function useClients() {
    return useContext(ClientsContext);
}