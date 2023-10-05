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

export default function CreateCharges({
  openCreateCharges,
  handleCloseCreateCharges,
  handleClickSnack,
  setCustomMessageApprove,
  inputChargeName
}) {

  const [inputChargeDesc, setInputChargeDesc] = useState("");
  const [inputChargeExpire, setInputChargeExpire] = useState("");
  const [inputChargeValue, setInputChargeValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("a");

  const [errorChargeDesc, setErrorChargeDesc] = useState(false);
  const [errorChargeExpire, setErrorChargeExpire] = useState(false);
  const [errorChargeValue, setErrorChargeValue] = useState(false);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("clientsId");
    const token = localStorage.getItem("token");

    let isPaid = "";
    if (selectedValue === "a") {
      isPaid = true;
    } else if (selectedValue === "b") {
      isPaid = false;
    }

    if (inputChargeDesc === "") {
      setErrorChargeDesc(true);
      return;
    }

    if (inputChargeExpire === "") {
      setErrorChargeExpire(true);
      return;
    }

    if (inputChargeValue === "") {
      setErrorChargeValue(true);
      return;
    }

    let formattedDate = format(
      new Date(
        parseInt(inputChargeExpire.substr(6, 4)),
        parseInt(inputChargeExpire.substr(3, 2)),
        parseInt(inputChargeExpire.substr(0, 2))
      ),
      "yyyy/MM/dd"
    );

    try {
      const response = await registerUserFecth.post(
        "/create-charge",
        {
          cliente_id: id.toString(),
          descricao: inputChargeDesc.toString(),
          data_vencimento: formattedDate.toString(),
          valor: inputChargeValue.toString(),
          paga: isPaid.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInputChargeDesc("");
      setInputChargeExpire("");
      setInputChargeValue("");
      setSelectedValue("a");

      setErrorChargeDesc(false);
      setErrorChargeExpire(false);
      setErrorChargeValue(false);

      localStorage.removeItem("clientsId");
      localStorage.removeItem("clientsName");

      handleCloseCreateCharges();
      handleClickSnack();

      setCustomMessageApprove("Cobrança cadastrada com sucesso");
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
      <Modal open={openCreateCharges} onClose={handleCloseCreateCharges}>
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
                <p className="createcharges-title">Cadastro de Cobrança</p>
              </div>
              <div className="createcharges-inputandp">
                <p className="createcharges-p">Nome*</p>
                <input
                  readOnly={true}
                  value={inputChargeName}
                  className="createcharges-input"
                  type="text"
                  placeholder="Digite o nome"
                />
              </div>
              <div className="createcharges-inputandp">
                <p className="createcharges-p">Descrição*</p>
                <textarea
                  onChange={(e) => setInputChargeDesc(e.target.value)}
                  value={inputChargeDesc}
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
                      onChange={(e) => setInputChargeExpire(e.target.value)}
                      value={inputChargeExpire}
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
                      onChange={(e) => setInputChargeValue(e.target.value)}
                      value={inputChargeValue}
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
                onClick={handleCloseCreateCharges}
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
