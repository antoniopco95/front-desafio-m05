import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./styles.css";
import ClientsIcon from "../../assets/ClientsIcon.svg";
import { IMaskInput } from "react-imask";
import { getItem } from "../../utils/storage";
import registerUserFecth from "../../axios/config";
import useToast from "../../hooks/useToast";
import { useClients } from "../../context/clientsContext";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "30px",
  bgcolor: "background.paper",
  p: 4,
};

export default function AddClientModal({ openAdd, handleCloseAdd }) {
  const { addClient } = useClients();

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputCpf, setInputCpf] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressComplement, setaddressComplement] = useState("");
  const [cep, setCep] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const [showErrorName, setShowErrorName] = useState(false);
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorCpf, setShowErrorCpf] = useState(false);
  const [showErrorPhone, setShowErrorPhone] = useState(false);

  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessageCpf, setErrorMessageCpf] = useState("");
  const [errorMessagePhone, setErrorMessagePhone] = useState("");

  const [clientsData, setClientsData] = useState([]);

  const fetchDbData = async () => {
    const token = getItem("token");

    if (token) {
      try {
        const response = await registerUserFecth.get("/clientes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setClientsData(data);
      } catch (error) {
        const errorMessage = error.response;
        useToast(JSON.stringify(errorMessage), "error");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  function unformatCPF(cpf) {
    return cpf.replace(/\D/g, "");
  }

  function unformatPhone(inputPhone) {
    return inputPhone.replace(/\D/g, "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputName === "") {
      setErrorMessageName("Este campo deve ser preenchido");
      setShowErrorName(true);
      return;
    }

    const emailExists = clientsData.some(
      (client) => client.email === inputEmail
    );

    if (emailExists) {
      setErrorMessageEmail("E-mail já cadastrado");
      setShowErrorEmail(true);
      return;
    }

    if (inputEmail === "") {
      setErrorMessageEmail("Este campo deve ser preenchido");
      setShowErrorEmail(true);

      return;
    }

    if (inputCpf === "") {
      setErrorMessageCpf("Este campo deve ser preenchido");
      setShowErrorCpf(true);

      return;
    }

    const unformattedInputCpf = unformatCPF(inputCpf);

    const cpfExists = clientsData.some(
      (client) => client.cpf === unformattedInputCpf
    );

    if (cpfExists) {
      setErrorMessageCpf("Cpf já cadastrado");
      setShowErrorCpf(true);
      return;
    }

    if (inputPhone === "") {
      setErrorMessagePhone("Este campo deve ser preenchido");
      setShowErrorPhone(true);

      return;
    }

    const token = getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const newClient = {
        nome: inputName,
        email: inputEmail,
        cpf: inputCpf,
        telefone: inputPhone,
        endereco: address,
        complemento: addressComplement,
        cep,
        bairro: neighborhood,
        cidade: city,
        uf
      };

      const res = await registerUserFecth.post(
        "/create-cliente",
        newClient,
        config
      );

      if (res.status === 200 || res.status === 201) {
        useToast("Cliente cadastrado com sucesso");

        handleCloseAdd();

        setInputName("");
        setInputEmail("");
        setInputCpf("");
        setInputPhone("");

        addClient(newClient);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response;
        useToast(JSON.stringify(errorMessage), "error");
      } else {
        console.error("Erro desconhecido:", error.message);
      }
    }
  };

  const cleanInput = (e) => {
    e.preventDefault();

    setInputName("");
    setInputEmail("");
    setInputCpf("");
    setInputPhone("");

    handleCloseAdd();
  };

  return (
    <div>
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box className="add-box" sx={style}>
          <form className="addclientmodal-box">
            <div className="addclientmodal-fulltitle">
              <img
                src={ClientsIcon}
                className="clients-icon"
                alt="clientsicon"
              />
              <label className="addclientmodal-title">
                Cadastro do Cliente
              </label>
            </div>
            <div className="addclientmodal-textfield">
              <label className="addclientmodal-span">Nome*</label>
              <input
                onChange={(e) => setInputName(e.target.value)}
                value={inputName}
                className={`addclientmodal-input ${showErrorName ? "border-red" : ""
                  }`}
                placeholder="Digite seu nome"
                type="text"
                id="nome"
              />
              {showErrorName && (
                <p
                  style={{
                    color: "red",
                    fontFamily: "Nunito",
                    fontSize: "8.4px",
                    marginTop: "4.2px",
                  }}
                >
                  {errorMessageName}
                </p>
              )}
            </div>
            <div className="addclientmodal-textfield">
              <label className="addclientmodal-span">E-mail*</label>
              <input
                onChange={(e) => setInputEmail(e.target.value)}
                value={inputEmail}
                className={`addclientmodal-input ${showErrorEmail ? "border-red" : ""
                  }`}
                placeholder="Digite seu e-mail"
                type="email"
                id="email"
              />
              {showErrorEmail && (
                <p
                  style={{
                    color: "red",
                    fontFamily: "Nunito",
                    fontSize: "8.4px",
                    marginTop: "4.2px",
                  }}
                >
                  {errorMessageEmail}
                </p>
              )}
            </div>
            <div className="addclientmodal-telandcpf">
              <div className="addclientmodal-textfield middle">
                <label className="addclientmodal-span">CPF*</label>
                <IMaskInput
                  onChange={(e) => {
                    const newCpf = e.target.value;
                    setInputCpf(unformatCPF(newCpf));
                  }}
                  value={inputCpf}
                  className={`addclientmodal-input middle-input-both ${showErrorCpf ? "border-red" : ""
                    }`}
                  placeholder="Digite seu CPF"
                  type="text"
                  id="cpf"
                  mask="000.000.000-00"
                />
                {showErrorCpf && (
                  <p
                    style={{
                      color: "red",
                      fontFamily: "Nunito",
                      fontSize: "8.4px",
                      marginTop: "4.2px",
                    }}
                  >
                    {errorMessageCpf}
                  </p>
                )}
              </div>
              <div className="addclientmodal-textfield">
                <label className="addclientmodal-span">Telefone*</label>
                <IMaskInput
                  onChange={(e) => setInputPhone(unformatPhone(e.target.value))}
                  value={inputPhone}
                  className={`addclientmodal-input middle-input-both ${showErrorPhone ? "border-red" : ""
                    }`}
                  placeholder="Digite seu Telefone"
                  type="text"
                  id="telefone"
                  mask="(00) 00000-0000"
                />
                {showErrorPhone && (
                  <p
                    style={{
                      color: "red",
                      fontFamily: "Nunito",
                      fontSize: "8.4px",
                      marginTop: "4.2px",
                    }}
                  >
                    {errorMessagePhone}
                  </p>
                )}
              </div>
            </div>

            <div className="addclientmodal-textfield">
              <label className="addclientmodal-span">Endereço</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="addclientmodal-input"
                placeholder="Digite o endereço"
                type="text"
                id="endereco"
              />
            </div>
            <div className="addclientmodal-textfield">
              <label className="addclientmodal-span">Complemento</label>
              <input
                onChange={(e) => setaddressComplement(e.target.value)}
                value={addressComplement}
                className="addclientmodal-input"
                placeholder="Digite o complemento"
                type="text"
                id="complemento"
              />
            </div>

            <div className="addclientmodal-telandcpf">
              <div className="addclientmodal-textfield middle">
                <label className="addclientmodal-span">CEP:</label>
                <IMaskInput
                  onChange={(e) => setCep(e.target.value)}
                  value={cep}
                  className="addclientmodal-input middle-input-both"
                  placeholder="Digite o CEP"
                  type="text"
                  id="cep"
                  mask="00000-000"
                />
              </div>
              <div className="addclientmodal-textfield">
                <label className="addclientmodal-span">Bairro</label>
                <input
                  onChange={(e) => setNeighborhood(e.target.value)}
                  value={neighborhood}
                  className="addclientmodal-input middle-input-both"
                  placeholder="Digite o bairro"
                  type="text"
                  id="bairro"
                />
              </div>
            </div>
            <div className="addclientmodal-telandcpf">
              <div className="addclientmodal-textfield middle">
                <label className="addclientmodal-span">Cidade</label>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  className="addclientmodal-input middle-city"
                  placeholder="Digite a cidade"
                  type="text"
                  id="city"
                />
              </div>
              <div className="addclientmodal-textfield">
                <label className="addclientmodal-span">UF</label>
                <input
                  onChange={(e) => setUf(e.target.value)}
                  value={uf}
                  className="addclientmodal-input middle-uf"
                  placeholder="Digite a UF"
                  type="text"
                  id="uf"
                  maxLength="2"
                />
              </div>
            </div>
            <div className="addclientmodal-buttons">
              <button
                className="addclientmodal-cancelbtn"
                onClick={cleanInput}
                id="aplicar"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="addclientmodal-button"
                type="submit"
                id="aplicar"
              >
                Aplicar
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
