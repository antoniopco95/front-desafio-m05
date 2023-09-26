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
import useUser from "../../hooks/useUser";

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

export default function EditClientModal({
  userData,
  handleCloseAdd,
  function1,
}) {
  const { openEditClientModal, setOpenEditClientModal } = useUser();

  const [inputName2, setInputName2] = useState("");
  const [inputEmail2, setInputEmail2] = useState("");
  const [inputCpf2, setInputCpf2] = useState("");
  const [inputPhone2, setInputPhone2] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressComplement2, setaddressComplement2] = useState("");
  const [cep2, setCep2] = useState("");
  const [neighborhood2, setNeighborhood2] = useState("");
  const [city2, setCity2] = useState("");
  const [uf2, setUf2] = useState("");

  const [showErrorName2, setShowErrorName2] = useState(false);
  const [showErrorEmail2, setShowErrorEmail2] = useState(false);
  const [showErrorCpf2, setShowErrorCpf2] = useState(false);
  const [showErrorPhone2, setShowErrorPhone2] = useState(false);

  const [errorMessageName2, setErrorMessageName2] = useState("");
  const [errorMessageEmail2, setErrorMessageEmail2] = useState("");
  const [errorMessageCpf2, setErrorMessageCpf2] = useState("");
  const [errorMessagePhone2, setErrorMessagePhone2] = useState("");

  const [clientsData, setClientsData] = useState([]);

  useEffect(() => {
    if (openEditClientModal) {
      setInputName2(userData.nome);
      setInputEmail2(userData.email);
      setInputCpf2(userData.cpf);
      setInputPhone2(userData.telefone);
      setAddress2(userData.endereco);
      setaddressComplement2(userData.complemento);
      setCep2(userData.cep);
      setNeighborhood2(userData.bairro);
      setCity2(userData.cidade);
      setUf2(userData.uf);
    }
  }, [openEditClientModal, userData]);

  function unformatCPF(cpf) {
    return cpf.replace(/\D/g, "");
  }

  function unformatPhone(inputPhone) {
    return inputPhone.replace(/\D/g, "");
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if (inputName2 === "") {
      setErrorMessageName2("Este campo deve ser preenchido");
      setShowErrorName2(true);
      return;
    }

    const emailExists = clientsData.some(
      (client) => client.email === inputEmail2
    );

    if (emailExists) {
      setErrorMessageEmail2("E-mail já cadastrado");
      setShowErrorEmail2(true);
      return;
    }

    if (inputEmail2 === "") {
      setErrorMessageEmail2("Este campo deve ser preenchido");
      setShowErrorEmail2(true);

      return;
    }

    if (inputCpf2 === "") {
      setErrorMessageCpf2("Este campo deve ser preenchido");
      setShowErrorCpf2(true);

      return;
    }

    const unformattedInputCpf = unformatCPF(inputCpf2);

    const cpfExists = clientsData.some(
      (client) => client.cpf === unformattedInputCpf
    );

    if (cpfExists) {
      setErrorMessageCpf2("Cpf já cadastrado");
      setShowErrorCpf2(true);
      return;
    }

    if (inputPhone2 === "") {
      setErrorMessagePhone2("Este campo deve ser preenchido");
      setShowErrorPhone2(true);

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
        nome: inputName2,
        email: inputEmail2,
        cpf: inputCpf2,
        telefone: inputPhone2,
        endereco: address2,
        complemento: addressComplement2,
        cep: cep2,
        bairro: neighborhood2,
        cidade: city2,
        uf: uf2,
      };

      const res = await registerUserFecth.put(
        `/cliente/${userData.cliente_id}`,
        newClient,
        config
      );

      if (res.status === 200 || res.status === 201) {
        useToast("Cliente atualizado com sucesso");

        handleCloseAdd();

        setInputName2("");
        setInputEmail2("");
        setInputCpf2("");
        setInputPhone2("");
        setAddress2("");
        setaddressComplement2("");
        setCep2("");
        setNeighborhood2("");
        setCity2("");
        setUf2("");

        function1();
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

    setInputName2("");
    setInputEmail2("");
    setInputCpf2("");
    setInputPhone2("");
    setAddress2("");
    setaddressComplement2("");
    setCep2("");
    setNeighborhood2("");
    setCity2("");
    setUf2("");

    handleCloseAdd();
  };

  function handleCloseEditModal() {
    setOpenEditClientModal(false);
  }

  return (
    <div>
      <Modal open={openEditClientModal} onClose={handleCloseEditModal}>
        <Box className="add-box" sx={style}>
          <form className="addclientmodal-box">
            <div className="addclientmodal-fulltitle">
              <img
                src={ClientsIcon}
                className="clients-icon"
                alt="clientsicon"
              />
              <label className="addclientmodal-title">Editar Cliente</label>
            </div>
            <div className="addclientmodal-textfield">
              <label className="addclientmodal-span">Nome*</label>
              <input
                onChange={(e) => setInputName2(e.target.value)}
                value={inputName2}
                className={`addclientmodal-input ${
                  showErrorName2 ? "border-red" : ""
                }`}
                placeholder="Digite seu nome"
                type="text"
                id="nome"
              />
              {showErrorName2 && (
                <p
                  style={{
                    color: "red",
                    fontFamily: "Nunito",
                    fontSize: "8.4px",
                    marginTop: "4.2px",
                  }}
                >
                  {errorMessageName2}
                </p>
              )}
            </div>
            <div className="addclientmodal-textfield">
              <label className="addclientmodal-span">E-mail*</label>
              <input
                onChange={(e) => setInputEmail2(e.target.value)}
                value={inputEmail2}
                className={`addclientmodal-input ${
                  showErrorEmail2 ? "border-red" : ""
                }`}
                placeholder="Digite seu e-mail"
                type="email"
                id="email"
              />
              {showErrorEmail2 && (
                <p
                  style={{
                    color: "red",
                    fontFamily: "Nunito",
                    fontSize: "8.4px",
                    marginTop: "4.2px",
                  }}
                >
                  {errorMessageEmail2}
                </p>
              )}
            </div>
            <div className="addclientmodal-telandcpf">
              <div className="addclientmodal-textfield middle">
                <label className="addclientmodal-span">CPF*</label>
                <IMaskInput
                  onChange={(e) => {
                    const newCpf = e.target.value;
                    console.log(newCpf);
                    setInputCpf2(unformatCPF(newCpf));
                  }}
                  value={inputCpf2}
                  className={`addclientmodal-input middle-input-both ${
                    showErrorCpf2 ? "border-red" : ""
                  }`}
                  placeholder="Digite seu CPF"
                  type="text"
                  id="cpf"
                  mask="000.000.000-00"
                />
                {showErrorCpf2 && (
                  <p
                    style={{
                      color: "red",
                      fontFamily: "Nunito",
                      fontSize: "8.4px",
                      marginTop: "4.2px",
                    }}
                  >
                    {errorMessageCpf2}
                  </p>
                )}
              </div>
              <div className="addclientmodal-textfield">
                <label className="addclientmodal-span">Telefone*</label>
                <IMaskInput
                  onChange={(e) =>
                    setInputPhone2(unformatPhone(e.target.value))
                  }
                  value={inputPhone2}
                  className={`addclientmodal-input middle-input-both ${
                    showErrorPhone2 ? "border-red" : ""
                  }`}
                  placeholder="Digite seu Telefone"
                  type="text"
                  id="telefone"
                  mask="(00) 00000-0000"
                />
                {showErrorPhone2 && (
                  <p
                    style={{
                      color: "red",
                      fontFamily: "Nunito",
                      fontSize: "8.4px",
                      marginTop: "4.2px",
                    }}
                  >
                    {errorMessagePhone2}
                  </p>
                )}
              </div>
            </div>

            <div className="addclientmodal-textfield">
              <label className="addclientmodal-span">Endereço</label>
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="addclientmodal-input"
                placeholder="Digite o endereço"
                type="text"
                id="endereco"
              />
            </div>
            <div className="addclientmodal-textfield">
              <label className="addclientmodal-span">Complemento</label>
              <input
                onChange={(e) => setaddressComplement2(e.target.value)}
                value={addressComplement2}
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
                  onChange={(e) => setCep2(e.target.value)}
                  value={cep2}
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
                  onChange={(e) => setNeighborhood2(e.target.value)}
                  value={neighborhood2}
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
                  onChange={(e) => setCity2(e.target.value)}
                  value={city2}
                  className="addclientmodal-input middle-city"
                  placeholder="Digite a cidade"
                  type="text"
                  id="city"
                />
              </div>
              <div className="addclientmodal-textfield">
                <label className="addclientmodal-span">UF</label>
                <input
                  onChange={(e) => setUf2(e.target.value)}
                  value={uf2}
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
                onClick={() => {
                  cleanInput();
                  handleCloseEditModal();
                }}
                id="aplicar"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleSubmit2();
                  handleCloseEditModal();
                }}
                className="addclientmodal-button"
                type="button"
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
