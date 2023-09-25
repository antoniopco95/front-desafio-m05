import { useState, useEffect } from "react";

function UseUserProvider() {
  const [openClientDetail, setOpenClientDetail] = useState(false);
  const [divIsVisible, setDivIsVisible] = useState(true);

  useEffect(() => {}, [divIsVisible, openClientDetail]);

  return {
    openClientDetail,
    setOpenClientDetail,
    divIsVisible,
    setDivIsVisible,
  };
}

export default UseUserProvider;
