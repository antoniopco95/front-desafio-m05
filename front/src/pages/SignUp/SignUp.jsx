import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Undone from "../../assets/StepLogin-Undone.svg";
import Done from "../../assets/StepLogin-Done.svg";
import Check from "../../assets/StepLogin-Check.svg";

import StatusUndone from "../../assets/LineStatusUndone.svg";
import StatusDone from "../../assets/LineStatusDone.svg";
import CheckFinal from "../../assets/CheckFinal.svg";
import CheckError from "../../assets/CheckError.svg";

import "./SignUpStyles.css";

import PasswordInput from "../../components/PasswordInput";
import registerUserFecth from "../../axios/config";
import useToast from "../../hooks/useToast";

const steps = [
  {
    label: "Cadastra-se",
    description: "Por favor, escreva seu nome e e-mail",
    id: "stepCadastro",
  },
  {
    label: "Escolha uma senha",
    description: "Escolha uma senha segura",
    id: "stepSenha",
  },
  {
    label: "Cadastro realizado com sucesso",
    description: "E-mail e senha cadastrados com sucesso.",
    id: "stepCadastroDone",
  },
];

const CustomStepIcon = ({ active, completed }) => {
  let icon;
  if (completed) {
    icon = (
      <img src={Check} alt="Completed Step" style={{ position: "relave" }} />
    );
  } else if (completed && steps.id === "stepCadastroDone") {
    icon = (
      <img src={Check} alt="Completed Step" style={{ position: "relave" }} />
    );
  } else if (active) {
    icon = (
      <img
        src={Done}
        alt="Active Step"
        style={{ position: "relative", cursor: "pointer" }}
      />
    );
  } else {
    icon = (
      <img src={Undone} alt="Inactive Step" style={{ position: "relative" }} />
    );
  }
  return icon;
};

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!name.trim()) {
        useToast("Por favor, preencha o campo de nome.", "error");
        return;
      }
      if (!email.trim()) {
        useToast("Por favor, preencha o campo de e-mail.", "error");
        return;
      }

      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!regex.test(email)) {
        useToast("Por favor, preencha um e-mail válido.", "error");
        return;
      }
    } else if (activeStep === 1) {
      if (password !== repeatPassword) {
        useToast("As senhas não coincidem.", "error");
        return;
      }

      if (password.length < 8) {
        useToast("Senha precisa ter no minímo 8 caracteres.", "error");
        return;
      }
    }

    if (activeStep === steps.length - 2) {
      handleCreateUser();
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBackDone = () => {
    setActiveStep(0);
    setError(false);
  };

  const handleCreateUser = async () => {
    try {
      const user = {
        nome: name,
        email,
        senha: password,
      };

      const res = await registerUserFecth.post("/registrar", user);

      if (res.status === 200) {
        useToast("Cadastro realizado com sucesso!");
        setFormSubmitted(true);
        setRequestStatus("success");
      }
    } catch (error) {
      const errorMessage = error.response.data;
      useToast(JSON.stringify(errorMessage), "error");
      setError(true);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#F0F0F5",
          width: "35%",
          minHeight: "100vh",
        }}
      >
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{ display: "flex", gap: "10px" }}
          connector={null}
        >
          {steps.map((step, index) => (
            <Step
              key={step.label}
              sx={{ height: "120px", marginBottom: "5px" }}
            >
              <StepLabel
                StepIconComponent={CustomStepIcon}
                onClick={() => {
                  if (step.id === "stepSenha") {
                    handleBackDone();
                  } else {
                  }
                }}
                completed={activeStep > index}
                sx={{ marginTop: "178px" }}
              >
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "130%",
                    color: "#0E8750",
                    marginLeft: "20px",
                  }}
                >
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent
                sx={{
                  borderLeft:
                    step.id === "stepCadastro"
                      ? "4px solid #0E8750"
                      : step.id === "stepSenha"
                        ? "4px solid #0E8750"
                        : "none",
                  minHeight: "90px",
                }}
              >
                <Typography
                  sx={{
                    height: "5rem",
                    fontFamily: "Nunito",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "130%",
                    color: "#3F3F55",
                    marginLeft: "30px",
                  }}
                >
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F8F8F9",
          width: "65%",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {activeStep === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      marginBottom: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      color: "#343447",
                      textAlign: "center",
                      fontFamily: "Montserrat",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "130%",
                    }}
                  >
                    Adicione seus dados
                  </span>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      marginBottom: "1rem",
                      padding: "5px",
                      gap: "5px",
                      fontFamily: "Nunito",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "20px",
                    }}
                  >
                    Nome*
                    <input
                      type="text"
                      placeholder="Digite seu nome"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #D0D5DD",
                        background: "#fff",
                        width: "368px",
                        height: "70px",
                        paddingLeft: "10px",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "24px",
                      }}
                    />
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      marginBottom: "1rem",
                      padding: "5px",
                      gap: "5px",
                      fontFamily: "Nunito",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "20px",
                    }}
                  >
                    E-mail*
                    <input
                      type="email"
                      placeholder="Digite seu e-mail"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #D0D5DD",
                        background: "#fff",
                        width: "368px",
                        height: "70px",
                        paddingLeft: "10px",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "24px",
                      }}
                    />
                  </label>
                </div>
              )}
              {activeStep === 1 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      marginBottom: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      color: "#343447",
                      textAlign: "center",
                      fontFamily: "Montserrat",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "130%",
                    }}
                  >
                    Escolha sua senha
                  </span>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      marginBottom: "1rem",
                      padding: "5px",
                      gap: "5px",
                      fontFamily: "Nunito",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "20px",
                    }}
                  >
                    Senha*
                    <PasswordInput
                      value={password}
                      onChange={(e) => {
                        const newPassword = e.target.value;
                        setPassword(newPassword);
                      }}
                    />
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      marginBottom: "1rem",
                      padding: "5px",
                      gap: "5px",
                      fontFamily: "Nunito",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "20px",
                    }}
                  >
                    Repita a senha*
                    <PasswordInput
                      value={repeatPassword}
                      onChange={(e) => {
                        const newPassword = e.target.value;
                        setRepeatPassword(newPassword);
                      }}
                    />
                  </label>
                </div>
              )}
              {activeStep === 2 && formSubmitted && (
                <Paper
                  square
                  elevation={0}
                  sx={{
                    background: "#F0F0F5",
                    width: "600px",
                    height: "512px",
                    borderRadius: "30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={CheckFinal}
                    alt="CheckFinal"
                    style={{
                      marginTop: "180px",
                    }}
                  />
                  <Typography
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "130%",
                      color: "#343447",
                      margin: "10px",
                    }}
                  >
                    Cadastro realizado com sucesso
                  </Typography>
                </Paper>
              )}
              {requestStatus === "error" && error && (
                <Paper
                  square
                  elevation={0}
                  sx={{
                    background: "#F0F0F5",
                    width: "600px",
                    height: "512px",
                    borderRadius: "30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={CheckError}
                    alt="CheckFinal"
                    style={{
                      marginTop: "180px",
                    }}
                  />
                  <Typography
                    style={{
                      textAlign: "center",
                      fontFamily: "Montserrat",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "130%",
                      color: "#343447",
                      margin: "10px",
                    }}
                  >
                    Erro no cadastro
                  </Typography>
                </Paper>
              )}
              {requestStatus === "error" && (
                <Button
                  onClick={handleBackDone}
                  sx={{
                    mt: 2,
                    width: "190px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "red",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#DA0175",
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: "auto",
                    "& .MuiButton-label": {
                      fontFamily: "Nunito",
                      fontSize: "18px",
                      fontWeight: "400",
                      lineHeight: "normal",
                      whiteSpace: "nowrap",
                    },
                  }}
                >
                  Por favor Corrigir!
                </Button>
              )}
              {activeStep < steps.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      mt: 2,
                      width: "190px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#DA0175",
                      color: "#F8F8F9",
                      "&:hover": {
                        backgroundColor: "#DA0175",
                      },
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mx: "auto",
                      "& .MuiButton-label": {
                        fontFamily: "Nunito",
                        fontSize: "18px",
                        fontWeight: "400",
                        lineHeight: "normal",
                        whiteSpace: "nowrap",
                      },
                    }}
                  >
                    {activeStep === steps.length - 2
                      ? "Finalizar Cadastro"
                      : "Continuar"}
                  </Button>
                  {activeStep === 0 && (
                    <span
                      style={{
                        display: "flex",
                        marginTop: "1rem",
                        fontFamily: "Nunito",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: "600",
                        lineHeight: "130%",
                        textAlign: "center",
                        mx: "auto",
                      }}
                    >
                      Já possui uma conta?Faça seu{" "}
                      <Link
                        to={"/"}
                        style={{
                          color: "#DA0175",
                          fontFamily: "Nunito",
                          fontSize: "18px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "130%",
                          textDecorationLine: "underline",
                          marginLeft: "0.2rem",
                        }}
                      >
                        Login
                      </Link>
                    </span>
                  )}
                </div>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  sx={{
                    mt: 2,
                    width: "190px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "#DA0175",
                    color: "#F8F8F9",
                    "&:hover": {
                      backgroundColor: "#DA0175",
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: "auto",
                    "& .MuiButton-label": {
                      fontFamily: "Nunito",
                      fontSize: "18px",
                      fontWeight: "400",
                      lineHeight: "normal",
                      whiteSpace: "nowrap",
                    },
                  }}
                >
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "#F8F8F9" }}
                  >
                    Ir para Login
                  </Link>
                </Button>
              )}
            </div>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <img
              src={activeStep === 0 ? StatusDone : StatusUndone}
              alt="Step Status"
              style={{
                display: "flex",
                top: "220px",
                height: "89px",
                right: "5rem",
                width: "100px",
              }}
            />
            <img
              src={activeStep === 1 ? StatusDone : StatusUndone}
              alt="Step Status"
              style={{
                display: "flex",
                top: "220px",
                height: "89px",
                right: "5rem",
                width: "100px",
              }}
            />
            <img
              src={activeStep === 2 ? StatusDone : StatusUndone}
              alt="Step Status"
              style={{
                display: "flex",
                top: "220px",
                height: "89px",
                right: "5rem",
                width: "100px",
              }}
            />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default SignUp;
