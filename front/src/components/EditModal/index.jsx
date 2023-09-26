import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./styles.css";
import EyeOff from "../../assets/EyeOff.svg";
import registerUserFecth from "../../axios/config";
import { IMaskInput } from "react-imask";
import CheckFinal from "../../assets/CheckFinal.svg";

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

export default function EditModal({ openEdit, handleCloseEdit }) {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirm, setInputConfirm] = useState("");

  const [showErrorName, setShowErrorName] = useState(false);
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [showErrorConfirm, setShowErrorConfirm] = useState(false);

  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [errorMessageConfirm, setErrorMessageConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputName === "") {
      setShowErrorName(true);
      return;
    }

    if (inputEmail === "") {
      setErrorMessageEmail("Este campo deve ser preenchido");
      setShowErrorEmail(true);
      return;
    }

    if (inputPassword === "") {
      setErrorMessagePassword("Este campo deve ser preenchido");
      setShowErrorPassword(true);
      return;
    } else if (inputPassword.length <= 7) {
      setErrorMessagePassword("A senha deve ter mais que 7 caracteres");
      setShowErrorPassword(true);
      return;
    }

    if (inputConfirm === "") {
      setErrorMessageConfirm("Este campo deve ser preenchido");
      setShowErrorConfirm(true);
      return;
    }

    if (inputPassword !== inputConfirm) {
      setErrorMessageConfirm("Suas senhas não coincidem");
      setShowErrorConfirm(true);
      return;
    }

    try {
      const response = await registerUserFecth.put(
        `/editar/${id}`,
        {
          nome: inputName.toString(),
          email: inputEmail.toString(),
          senha: inputConfirm.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      const nome = response.data.userEdit.nome;
      localStorage.setItem("name", nome);
      localStorage.getItem("name");

      handleCloseEdit();
      setConfirmModalOpen(true);

      setTimeout(() => {
        setConfirmModalOpen(false);
      }, 3000);

      setShowErrorName(false);
      setShowErrorEmail(false);
      setShowErrorPassword(false);
      setShowErrorConfirm(false);
    } catch (error) {
      setShowErrorEmail(true);
      setErrorMessageEmail(error.response.data.error);
    }
  };

  useEffect(() => {}, [id, token]);

  return (
    <div>
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box className="edit-box" sx={style}>
          <form className="editmodal-box" onSubmit={handleSubmit}>
            <label className="editmodal-title">Edite seu Cadastro</label>
            <div className="editmodal-textfield">
              <label className="editmodal-span">Nome*</label>
              <input
                onChange={(e) => setInputName(e.target.value)}
                value={inputName}
                className={`editmodal-input ${
                  showErrorName ? "border-red" : ""
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
                    fontSize: "14px",
                    marginTop: "6px",
                  }}
                >
                  Este campo deve ser preenchido
                </p>
              )}
            </div>
            <div className="editmodal-textfield">
              <label className="editmodal-span">E-mail*</label>
              <input
                onChange={(e) => setInputEmail(e.target.value)}
                value={inputEmail}
                className={`editmodal-input ${
                  showErrorEmail ? "border-red" : ""
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
                    fontSize: "14px",
                    marginTop: "6px",
                  }}
                >
                  {errorMessageEmail}
                </p>
              )}
            </div>
            <div className="editmodal-telandcpf">
              <div className="editmodal-textfield middle">
                <label className="editmodal-span">CPF</label>
                <IMaskInput
                  className="editmodal-input middle-input"
                  placeholder="Digite seu CPF"
                  type="text"
                  id="cpf"
                  mask="000.000.000-00"
                />
              </div>
              <div className="editmodal-textfield">
                <label className="editmodal-span">Telefone</label>
                <IMaskInput
                  className="editmodal-input middle-input"
                  placeholder="Digite seu Telefone"
                  type="text"
                  id="telefone"
                  mask="(00) 00000-0000"
                />
              </div>
            </div>
            <div className="editmodal-textfield">
              <label className="editmodal-span">Nova Senha*</label>
              <div
                className={`editmodal-inputandbtn  ${
                  showErrorPassword ? "border-red" : ""
                }`}
              >
                <input
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="editmodal-passinput"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  id="senha"
                />
                <img
                  onClick={(e) => setShowPassword(!showPassword)}
                  className="editmodal-hidebtn1"
                  src={EyeOff}
                  alt="eyeofficon"
                />
              </div>
              {showErrorPassword && (
                <p
                  style={{
                    color: "red",
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    marginTop: "6px",
                  }}
                >
                  {errorMessagePassword}
                </p>
              )}
            </div>
            <div className="editmodal-textfield">
              <label className="editmodal-span">Confirmar Senha*</label>
              <div
                className={`editmodal-inputandbtn  ${
                  showErrorConfirm ? "border-red" : ""
                }`}
              >
                <input
                  className="editmodal-passinput"
                  onChange={(e) => setInputConfirm(e.target.value)}
                  value={inputConfirm}
                  placeholder="••••••••"
                  type={showConfirm ? "text" : "password"}
                  id="confirmarsenha"
                />
                <img
                  onClick={(e) => setShowConfirm(!showConfirm)}
                  className="editmodal-hidebtn2"
                  src={EyeOff}
                  alt="eyeofficon"
                />
              </div>
              {showErrorConfirm && (
                <p
                  style={{
                    color: "red",
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    marginTop: "6px",
                  }}
                >
                  {errorMessageConfirm}
                </p>
              )}
            </div>
            <button className="editmodal-button" type="submit" id="aplicar">
              Aplicar
            </button>
          </form>
        </Box>
      </Modal>
      {isConfirmModalOpen && (
        <div className="shadow-modal">
          <div className="confirm-modal">
            <img
              className="check-modal"
              src={CheckFinal}
              alt="checkfinal-cin"
            />
            <span className="text-modal">Cadastro Alterado com sucesso!</span>
          </div>
        </div>
      )}
    </div>
  );
}
