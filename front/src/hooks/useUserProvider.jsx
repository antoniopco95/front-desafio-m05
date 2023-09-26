import { useState, useEffect } from "react";

function UseUserProvider() {
  const [openClientDetail, setOpenClientDetail] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const [divIsVisible, setDivIsVisible] = useState(true);
  const [id, setId] = useState("");
  const [charges, setCharges] = useState([]);

  useEffect(() => {}, [divIsVisible, openClientDetail]);

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
  };
}

export default UseUserProvider;
