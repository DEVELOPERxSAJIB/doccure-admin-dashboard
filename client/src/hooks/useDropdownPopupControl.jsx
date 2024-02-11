import { useEffect, useRef, useState } from "react";

const useDropdownPopupControl = () => {
  const [isOpne, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpne);
  };

  const dropdownRef = useRef(null);

  const handleClickEvent = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickEvent);

    return () => {
      document.removeEventListener("click", handleClickEvent);
    };
  }, []);

  return { isOpne, toggleMenu, dropdownRef };
};

export default useDropdownPopupControl;
