import React, { useState, useEffect } from "react";
import "./styles.css";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ChargesIcon from "../../assets/ChargesIcon.svg";
import CheckIcon from "../../assets/CheckIcon.svg";
import registerUserFecth from "../../axios/config";
import { IMaskInput } from "react-imask";
import { format } from "date-fns";
import useUser from "../../hooks/useUser";

export default function EditChargeModal({ charge, userName, handleUpdate }) {
  const { onClickSnack, setCustomMessageApprove } = useUser();
  const [selectedValue, setSelectedValue] = useState("a");

  const [errorChargeDesc, setErrorChargeDesc] = useState(false);
  const [errorChargeExpire, setErrorChargeExpire] = useState(false);
  const [errorChargeValue, setErrorChargeValue] = useState(false);

  const { openEditChargeModal, setOpenEditChargeModal } = useUser();

  const [editForm, setEditForm] = useState({
    nome: "",
    descricao: "",
    data_vencimento: "",
    valor: "",
    paga: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (openEditChargeModal) {
      setEditForm({
        nome: userName,
        descricao: charge.descricao,
        data_vencimento: format(new Date(parseInt(charge.data_vencimento.substr(0, 4)), parseInt(charge.data_vencimento.substr(5, 2) - 2), parseInt(charge.data_vencimento.substr(8, 2))), 'dd/MM/yyyy'),
        valor: charge.valor,
        paga: charge.paga,
      });
      charge.paga ? setSelectedValue("a") : setSelectedValue("b");
    }
  }, [openEditChargeModal, charge, userName]);

  const handleCloseEditChargeModal = () => {
    setOpenEditChargeModal(false);
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isPaid = "";

    if (selectedValue === "a") {
      isPaid = true;
    } else if (selectedValue === "b") {
      isPaid = false;
    }

    if (editForm.descricao === "") {
      setErrorChargeDesc(true);
      return;
    }

    if (editForm.data_vencimento === "") {
      setErrorChargeExpire(true);
      return;
    }

    if (editForm.valor === "") {
      setErrorChargeValue(true);
      return;
    }

    let formattedDate = format(
      new Date(
        parseInt(editForm.data_vencimento.substr(6, 4)),
        parseInt(editForm.data_vencimento.substr(3, 2)),
        parseInt(editForm.data_vencimento.substr(0, 2))
      ),
      "yyyy/MM/dd"
    )
    try {
      const response = await registerUserFecth.put(
        `/cobrancas/${charge.cobranca_id}`,
        {
          descricao: editForm.descricao.toString(),
          data_vencimento: formattedDate.toString(),
          valor: editForm.valor.toString(),
          paga: isPaid.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditForm({});
      setSelectedValue("a");

      setErrorChargeDesc(false);
      setErrorChargeExpire(false);
      setErrorChargeValue(false);

      localStorage.removeItem("clientsId");
      localStorage.removeItem("clientsName");

      handleCloseEditChargeModal();
      handleUpdate();
      onClickSnack();

      setCustomMessageApprove("Cobrança editada com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    backgroundColor: "#C8C8D7",
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#0E8750",
    backgroundImage: `url(${CheckIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  });

  return (
    <>
      <Modal open={openEditChargeModal} onClose={handleCloseEditChargeModal}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "30px",
            bgcolor: "background.paper",
            fontFamily: "Nunito",
            p: "48px 57px 40px 57px",
          }}
        >
          <form>
            <div>
              <div className="createcharges-iconandtitle">
                <img
                  className="createcharges-icon"
                  src={ChargesIcon}
                  alt="chargesicon"
                />
                <p className="createcharges-title">Edição de Cobrança</p>
              </div>
              <div className="createcharges-inputandp">
                <p className="createcharges-p">Nome*</p>
                <input
                  readOnly={true}
                  value={editForm.nome}
                  className="createcharges-input"
                  type="text"
                  placeholder="Digite o nome"
                />
              </div>
              <div className="createcharges-inputandp">
                <p className="createcharges-p">Descrição*</p>
                <textarea
                  onChange={(e) =>
                    setEditForm({ ...editForm, descricao: e.target.value })
                  }
                  value={editForm.descricao}
                  className={`createcharges-input createcharges-desc ${errorChargeDesc ? "border-red" : ""
                    }`}
                  type="text"
                  placeholder="Digite a descrição"
                  size="100"
                />
                {errorChargeDesc && (
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
              <div>
                <div className="createcharges-valueandexpire">
                  <div className="createcharges-inputandp">
                    <p className="createcharges-p">Vencimento:*</p>
                    <IMaskInput
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          data_vencimento: e.target.value,
                        })
                      }
                      value={editForm.data_vencimento}
                      className={`createcharges-input createcharges-middleinput ${errorChargeExpire ? "border-red" : ""
                        }`}
                      type="text"
                      placeholder="Data de Vencimento"
                      mask="00/00/0000"
                    />
                    {errorChargeExpire && (
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
                  <div className="createcharges-inputandp">
                    <p className="createcharges-p">Valor:*</p>
                    <input
                      onChange={(e) =>
                        setEditForm({ ...editForm, valor: e.target.value })
                      }
                      value={editForm.valor}
                      className={`createcharges-input createcharges-middleinput ${errorChargeValue ? "border-red" : ""
                        }`}
                      type="text"
                      placeholder="Digite o valor"
                    />
                    {errorChargeValue && (
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
                </div>
                <div className="createcharges-inputandp">
                  <p className="createcharges-p">Status*</p>
                  <div className="createcharges-inputandradio">
                    <Radio
                      checked={selectedValue === "a"}
                      onChange={handleChange}
                      value="a"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "A" }}
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                    />
                    <label className="createcharges-label">Cobrança Paga</label>
                  </div>
                  <div className="createcharges-inputandradio">
                    <Radio
                      checked={selectedValue === "b"}
                      onChange={handleChange}
                      value="b"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "B" }}
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                    />
                    <label className="createcharges-label">
                      Cobrança Pendente
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="createcharges-buttons">
              <button
                className="createcharges-button createcharges-cancel"
                onClick={handleCloseEditChargeModal}
              >
                Cancelar
              </button>
              <button
                className="createcharges-button createcharges-apply"
                onClick={handleSubmit}
              >
                Aplicar
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
