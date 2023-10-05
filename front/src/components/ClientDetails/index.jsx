import "./styles.css";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";
import registerUserFecth from "../../axios/config";
import { getItem, setItem } from "../../utils/storage";
import { format } from "date-fns";
import EditClientModal from "../EditClientModal";
import EditChargeModal from "../EditChargeModal";

function ClientDetails({
  handleOpenCreateCharges,
  setCustomMessageApprove,
  handleDelChargesOpen,
  handleOpenChargesDetails,
  handleClickSnack,
}) {
  const [update, setUpdate] = useState(false);
  const [chargesLoaded, setChargesLoaded] = useState(false);
  const [charge, setCharge] = useState("");
  let Real = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const {
    id,
    openEditClientModal,
    setOpenEditClientModal,
    charges,
    setCharges,
    openEditChargeModal,
    setOpenEditChargeModal,
  } = useUser();
  const [userById, setUserById] = useState({
    nome: "-",
    email: "-",
    telefone: "-",
    cpf: "-",
    endereco: "-",
    complemento: "-",
    cidade: "-",
    uf: "-",
  });
  function formatCPF(cpf) {
    const cleanedCPF = cpf.replace(/\D/g, "");

    const formattedCPF = cleanedCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );

    return formattedCPF;
  }

  function formatPhoneNumber(phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const formattedPhoneNumber = cleanedPhoneNumber.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );

    return formattedPhoneNumber;
  }

  useEffect(() => {
    async function getUserById() {
      const token = getItem("token");
      try {
        const response = await registerUserFecth.get(
          `/cliente/${id.cliente_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserById(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUserById();
  }, [update]);

  useEffect(() => {
    async function getChargesByClient() {
      const token = getItem("token");
      try {
        const response = await registerUserFecth.get(
          `/cliente/cobranca/${id.cliente_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCharges(response.data);
          setChargesLoaded(true);
        } else {
          const { status, data } = response;
          if (
            status === 404 &&
            data &&
            data.error === "Erro ao buscar cobranças do cliente"
          ) {
            setCharges([]);
            setChargesLoaded(true);
          } else {
            console.error(`Erro desconhecido: ${data.error}`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getChargesByClient();
  }, [update, charges]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  return (
    <>
      <div className="client-detail-container">
        <div className="client-detail-title">
          <p>{">  Detalhes do cliente"}</p>
        </div>
        <div className="user-name-detail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M7.70852 25.667H17.624C18.3767 25.667 18.969 25.0426 18.819 24.305C18.405 22.2686 17.0526 18.667 12.6663 18.667C8.28003 18.667 6.92768 22.2686 6.5136 24.305C6.36362 25.0426 6.95586 25.667 7.70852 25.667Z"
              stroke="#3F3F55"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 18.667C23.7717 18.667 24.9069 21.5309 25.3652 23.595C25.6127 24.7097 24.7111 25.667 23.5692 25.667H22.3333"
              stroke="#3F3F55"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.6667 13.6663C14.6917 13.6663 16.3333 12.0247 16.3333 9.99967C16.3333 7.97463 14.6917 6.33301 12.6667 6.33301C10.6416 6.33301 9 7.97463 9 9.99967C9 12.0247 10.6416 13.6663 12.6667 13.6663Z"
              stroke="#3F3F55"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.667 13.6663C21.6921 13.6663 23.0003 12.0247 23.0003 9.99967C23.0003 7.97463 21.6921 6.33301 19.667 6.33301"
              stroke="#3F3F55"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1>{userById.nome}</h1>
        </div>
        <div className="client-data">
          <div className="sub-title">
            <h2>Dados do cliente</h2>
            <div className="client-edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M4.0625 15.2528L7.25 14.5028L14.2197 7.53315C14.5126 7.24025 14.5126 6.76538 14.2197 6.47248L12.8428 5.09565C12.55 4.80275 12.0751 4.80275 11.7822 5.09565L4.8125 12.0653L4.0625 15.2528Z"
                  stroke="#0E8750"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.9375 15.2529H10.8125"
                  stroke="#0E8750"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 onClick={() => setOpenEditClientModal(true)}>
                Editar Cliente
              </h3>
              {openEditClientModal && (
                <EditClientModal
                  userData={userById}
                  update={setUserById}
                  handleUpdate={handleUpdate}
                />
              )}
            </div>
          </div>
          <div className="client-details-all">
            <div className="client-details-first">
              <div className="email">
                <p className="style1">Email</p>
                <p className="style2">
                  {userById.email ? userById.email : "-"}
                </p>
              </div>
              <div className="telefone">
                <p className="style1">Telefone</p>
                <p className="style2">
                  {userById.telefone
                    ? formatPhoneNumber(userById.telefone)
                    : "-"}
                </p>
              </div>
              <div className="cpf">
                <p className="style1">CPF</p>
                <p className="style2">
                  {userById.cpf ? formatCPF(userById.cpf) : "-"}
                </p>
              </div>
            </div>
            <div className="client-details-second">
              <div className="adress">
                <p className="style1">Endereço</p>
                <p className="style2">
                  {userById.endereco ? userById.endereco : "-"}
                </p>
              </div>
              <div className="neighborhood">
                <p className="style1">Bairro</p>
                <p className="style2">
                  {userById.bairro ? userById.bairro : "-"}
                </p>
              </div>
              <div className="complement">
                <p className="style1">Complemento</p>
                <p className="style2">
                  {userById.complemento ? userById.complemento : "-"}
                </p>
              </div>
              <div className="cep">
                <p className="style1">CEP</p>
                <p className="style2">{userById.cep ? userById.cep : "-"}</p>
              </div>
              <div className="city">
                <p className="style1">Cidade</p>
                <p className="style2">
                  {userById.cidade ? userById.cidade : "-"}
                </p>
              </div>
              <div className="uf">
                <p className="style1">UF</p>
                <p className="style2">{userById.uf ? userById.uf : "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="client-charges-detail">
          <div className="client-charges-title">
            <h1>Cobranças do Cliente</h1>
            <div
              className="client-charges-button"
              onClick={() => {
                setItem("clientsName", userById.nome);
                setItem("clientsId", userById.cliente_id);
                handleOpenCreateCharges();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.50033 2.69336C8.86852 2.69336 9.16699 2.99184 9.16699 3.36003V7.36003H13.167C13.5352 7.36003 13.8337 7.65851 13.8337 8.0267C13.8337 8.39489 13.5352 8.69336 13.167 8.69336H9.16699V12.6934C9.16699 13.0616 8.86852 13.36 8.50033 13.36C8.13214 13.36 7.83366 13.0616 7.83366 12.6934V8.69336H3.83366C3.46547 8.69336 3.16699 8.39489 3.16699 8.0267C3.16699 7.65851 3.46547 7.36003 3.83366 7.36003H7.83366V3.36003C7.83366 2.99184 8.13214 2.69336 8.50033 2.69336Z"
                  fill="#F8F8F9"
                />
              </svg>
              <p>Nova cobrança</p>
            </div>
          </div>
          <div className="client-all-charges">
            <div className="client-charges-header">
              <div className="idCob">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_83857_3985)">
                    <path
                      d="M9.5 11.0264L9.5 23.7764"
                      stroke="#3F3F55"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 20.7764L9.5 23.7764L6.5 20.7764"
                      stroke="#3F3F55"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 14.0264L15.5 1.27637"
                      stroke="#3F3F55"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 4.27637L15.5 1.27637L18.5 4.27637"
                      stroke="#3F3F55"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_83857_3985">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(24.5 0.526367) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p>ID Cob.</p>
              </div>
              <div className="dueDate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_83857_3985)">
                    <path
                      d="M9.5 11.0264L9.5 23.7764"
                      stroke="#3F3F55"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 20.7764L9.5 23.7764L6.5 20.7764"
                      stroke="#3F3F55"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 14.0264L15.5 1.27637"
                      stroke="#3F3F55"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.5 4.27637L15.5 1.27637L18.5 4.27637"
                      stroke="#3F3F55"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_83857_3985">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(24.5 0.526367) rotate(90)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <p>Data de venc.</p>
              </div>
              <div className="value">
                <p>Valor</p>
              </div>
              <div className="charge-status">
                <p>Status</p>
              </div>
              <div className="description">
                <p>Descrição</p>
              </div>
            </div>
            <div className="client-charges-header-line"></div>
            {chargesLoaded ? (
              charges.length > 0 ? (
                charges.map((charge) => {
                  return (
                    <>
                      <div
                        className="client-charges-details-line"
                        key={charge.cobranca_id}
                      >
                        <div className="line-id font1" onClick={() => {
                          setItem("chargesId", charge.cobranca_id);
                          handleOpenChargesDetails();
                        }}>
                          <p>{charge.cobranca_id.toString().substring(0, 8)}</p>
                        </div>
                        <div className="line-date font1" onClick={() => {
                          setItem("chargesId", charge.cobranca_id);
                          handleOpenChargesDetails();
                        }}>
                          <p>
                            {format(new Date(parseInt(charge.data_vencimento.substr(0, 4)), parseInt(charge.data_vencimento.substr(5, 2) - 2), parseInt(charge.data_vencimento.substr(8, 2))), 'dd/MM/yyyy')}
                          </p>
                        </div>
                        <div className="line-value font1" onClick={() => {
                          setItem("chargesId", charge.cobranca_id);
                          handleOpenChargesDetails();
                        }}>
                          <p>{Real.format(charge.valor)}</p>
                        </div>
                        <div className="line-status-container" onClick={() => {
                          setItem("chargesId", charge.cobranca_id);
                          handleOpenChargesDetails();
                        }}>
                          <div
                            className={`line-status ${charge.status === "Vencida"
                              ? "overcome-container"
                              : charge.status === "Prevista"
                                ? "pending-container"
                                : charge.status === "Paga" && "paid-container"
                              }`}
                          >
                            <p
                              className={`font3 ${charge.status === "Vencida"
                                ? "overcome-text"
                                : charge.status === "Prevista"
                                  ? "pending-text"
                                  : charge.status === "Paga" && "paid-text"
                                }`}
                            >
                              {charge.status}
                            </p>
                          </div>
                        </div>
                        <div className="line-description font1" onClick={() => {
                          setItem("chargesId", charge.cobranca_id);
                          handleOpenChargesDetails();
                        }}>
                          <p>{charge.descricao ? charge.descricao : "-"}</p>
                        </div>
                        <div
                          className="line-edit"
                          onClick={() => {
                            setOpenEditChargeModal(true);
                            setCharge({ ...charge });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_83857_4016)">
                              <path
                                d="M1.25 15.325L5.5 14.325L14.7929 5.03216C15.1834 4.64163 15.1834 4.00847 14.7929 3.61794L12.9571 1.78216C12.5666 1.39163 11.9334 1.39163 11.5429 1.78216L2.25 11.075L1.25 15.325Z"
                                stroke="#747488"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.75 15.3252H10.25"
                                stroke="#747488"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_83857_4016">
                                <rect
                                  width="16"
                                  height="16"
                                  fill="white"
                                  transform="translate(0.5 0.0751953)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>Editar</p>
                        </div>
                        <div className="line-exclude" onClick={() => {
                          setItem("chargesId", charge.cobranca_id);
                          handleDelChargesOpen();
                        }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="17"
                            viewBox="0 0 18 17"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_83857_4022)">
                              <path
                                d="M3.25 3.8252L4.09115 13.4985C4.18102 14.532 5.04622 15.3252 6.08363 15.3252H10.9164C11.9538 15.3252 12.819 14.532 12.9088 13.4985L13.75 3.8252"
                                stroke="#AE1100"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.25 3.5752V2.8252C6.25 1.72063 7.1454 0.825195 8.25 0.825195H8.75C9.8546 0.825195 10.75 1.72063 10.75 2.8252V3.5752"
                                stroke="#AE1100"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M1.5 3.8252H15.5"
                                stroke="#AE1100"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_83857_4022">
                                <rect
                                  width="17"
                                  height="16"
                                  fill="white"
                                  transform="translate(0.5 0.0751953)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <p>Excluir</p>
                        </div>
                      </div>
                      <>
                        <div className="client-charges-details-bottomLine"></div>
                      </>
                    </>
                  );
                })
              ) : (
                <p>...</p>
              )
            ) : (
              <div className="line-description font1">
                <p>Nehuma cobrança cadastrada para o cliente.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {openEditChargeModal && (
        <EditChargeModal
          charge={charge}
          userName={userById.nome}
          handleUpdate={handleUpdate}
          handleClickSnack={handleClickSnack}
          setCustomMessageApprove={setCustomMessageApprove}
        />
      )}
    </>
  );
}

export default ClientDetails;
