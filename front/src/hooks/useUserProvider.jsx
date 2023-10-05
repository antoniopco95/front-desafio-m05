import { useState, useEffect } from "react";

function UseUserProvider() {

  const [openClientDetail, setOpenClientDetail] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const [openEditChargeModal, setOpenEditChargeModal] = useState(false);
  const [divIsVisible, setDivIsVisible] = useState(true);
  const [id, setId] = useState("");
  const [charges, setCharges] = useState([]);
  const [customMessageApprove, setCustomMessageApprove] = useState("");

  const [openSnackApprove, setOpenSnackApprove] = useState(false);
  const onClickSnack = () => {
    setOpenSnackApprove(true);
  };

  useEffect(() => { }, [divIsVisible, openClientDetail]);

  return {
    openClientDetail,
    setOpenClientDetail,
    divIsVisible,
    setDivIsVisible,
    id,
    setId,
    openEditClientModal,
    setOpenEditClientModal,
    charges,
    setCharges,
    openEditChargeModal,
    setOpenEditChargeModal,
    customMessageApprove,
    setCustomMessageApprove,
    openSnackApprove,
    setOpenSnackApprove,
    onClickSnack,
  };
}

export default UseUserProvider;
