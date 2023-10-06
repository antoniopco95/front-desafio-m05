import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useToast from "../../hooks/useToast";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/pageLogin.png";
import "./LoginStyles.css";
import PasswordInput from "../../components/PasswordInput";
import registerUserFecth from "../../axios/config";

const LoginUser = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated) {
    return navigate("/dashboard");
  }

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      useToast("Por favor preencha todos os campos", "error");
      return;
    }

    try {
      const userLogin = {
        email,
        senha: password,
      };

      const res = await registerUserFecth.post("/login", userLogin);

      if (res.status === 200) {
        useToast("Usuário logado com sucesso");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.usuario.id);
        localStorage.setItem("name", res.data.usuario.nome);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        useToast(errorMessage, "error");
      }
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
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <span
          style={{
            color: "#034A2A",
            textAlign: "center",
            fontFamily: "Montserrat",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "600",
            lineheight: "130%",
            marginTop: "163px",
            width: "388px",
          }}
        >
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </span>
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
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
                Faça seu Login!
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
                E-mail*
                <input
                  type="text"
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "368px",
                  marginBottom: "0.1rem",
                  padding: "5px",
                  gap: "5px",
                  fontFamily: "Nunito",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "20px",
                }}
              >
                <label style={{ alignSelf: "flex-start" }}>Senha*</label>
                <span
                  style={{
                    alignSelf: "flex-end",
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "130%",
                    color: "#DA0175",
                  }}
                >
                  Esqueceu a senha?
                </span>
              </div>
              <PasswordInput
                value={password}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setPassword(newPassword);
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                onClick={handleSignIn}
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
                Entrar
              </Button>

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
                Ainda não possui uma conta?{" "}
                <Link
                  to={"/register"}
                  style={{
                    color: "#DA0175",
                    fontFamily: "Nunito",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "130%",
                    textDecorationLine: "underline",
                    marginLeft: '0.2rem'
                  }}
                >
                  Cadastra-se
                </Link>
              </span>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default LoginUser;
