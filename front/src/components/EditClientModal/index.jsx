import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./styles.css";
import ClientsIcon from "../../assets/ClientsIcon.svg";
import { IMaskInput } from "react-imask";
import { getItem } from "../../utils/storage";
import registerUserFecth from "../../axios/config";
import useToast from "../../hooks/useToast";
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

export default function EditClientModal({ userData, handleUpdate, update, }) {

  const { openEditClientModal, setOpenEditClientModal } = useUser();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: "",
    complemento: "",
    cep: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

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
      setForm(userData);
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

    if (form.nome === "") {
      setErrorMessageName2("Este campo deve ser preenchido");
      setShowErrorName2(true);
      return;
    }

    const emailExists = clientsData.some(
      (client) => client.email === form.email
    );

    if (emailExists) {
      setErrorMessageEmail2("E-mail já cadastrado");
      setShowErrorEmail2(true);
      return;
    }

    if (form.email === "") {
      setErrorMessageEmail2("Este campo deve ser preenchido");
      setShowErrorEmail2(true);

      return;
    }

    if (form.cpf === "") {
      setErrorMessageCpf2("Este campo deve ser preenchido");
      setShowErrorCpf2(true);

      return;
    }

    const unformattedInputCpf = unformatCPF(form.cpf);

    const cpfExists = clientsData.some(
      (client) => client.cpf === unformattedInputCpf
    );

    if (cpfExists) {
      setErrorMessageCpf2("Cpf já cadastrado");
      setShowErrorCpf2(true);
      return;
    }

    if (form.telefone === "") {
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
        ...form,
      };

      const res = await registerUserFecth.put(
        `/cliente/${userData.cliente_id}`,
        newClient,
        config
      );

      if (res.status === 200 || res.status === 201) {
        useToast("Cliente atualizado com sucesso");
        handleCloseEditModal();
        update({ ...form });
        setForm({
          nome: "",
          email: "",
          cpf: "",
          telefone: "",
          endereco: "",
          complemento: "",
          cep: "",
          bairro: "",
          cidade: "",
          uf: "",
        });

        handleUpdate();
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        useToast(JSON.stringify(errorMessage), "error");
      } else {
        console.error("Erro desconhecido:", error.message);
      }
    }
  };

  function handleCloseEditModal() {
    setOpenEditClientModal(false);
  }

  return (
    <div>
      <Modal open={openEditClientModal} onClose={handleCloseEditModal}>
        <Box className="add-box" sx={style}>
          <form className="addclientmodal-box" onSubmit={handleSubmit2}>
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
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                value={form.nome}
                className={`addclientmodal-input ${showErrorName2 ? "border-red" : ""
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                value={form.email}
                className={`addclientmodal-input ${showErrorEmail2 ? "border-red" : ""
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
                    setForm({ ...form, cpf: unformatCPF(e.target.value) });
                  }}
                  value={form.cpf}
                  className={`addclientmodal-input middle-input-both ${showErrorCpf2 ? "border-red" : ""
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
                    setForm({
                      ...form,
                      telefone: unformatPhone(e.target.value),
                    })
                  }
                  value={form.telefone}
                  className={`addclientmodal-input middle-input-both ${showErrorPhone2 ? "border-red" : ""
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
                onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                value={form.endereco}
                className="addclientmodal-input"
                placeholder="Digite o endereço"
                type="text"
                id="endereco"
              />
            </div>
            <div className="addclientmodal-textfield">
              <label className="addclientmodal-span">Complemento</label>
              <input
                onChange={(e) =>
                  setForm({ ...form, complemento: e.target.value })
                }
                value={form.complemento}
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
                  onChange={(e) => setForm({ ...form, cep: e.target.value })}
                  value={form.cep}
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
                  onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                  value={form.bairro}
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
                  onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                  value={form.cidade}
                  className="addclientmodal-input middle-city"
                  placeholder="Digite a cidade"
                  type="text"
                  id="city"
                />
              </div>
              <div className="addclientmodal-textfield">
                <label className="addclientmodal-span">UF</label>
                <input
                  onChange={(e) => setForm({ ...form, uf: e.target.value })}
                  value={form.uf}
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
                onClick={handleCloseEditModal}
                id="aplicar"
                type="button"
              >
                Cancelar
              </button>
              <button
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
