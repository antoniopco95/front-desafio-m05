import { useState, useEffect } from "react";

function UseUserProvider() {
  const [openClientDetail, setOpenClientDetail] = useState(false);
  const [divIsVisible, setDivIsVisible] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {}, [divIsVisible, openClientDetail]);

  return {
    openClientDetail,
    setOpenClientDetail,
    divIsVisible,
    setDivIsVisible,
    id,
    setId,
  };
}

export default UseUserProvider;
