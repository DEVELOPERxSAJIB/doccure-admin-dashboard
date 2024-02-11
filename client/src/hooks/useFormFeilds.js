import { useState } from "react";

const useFormFeilds = (initState) => {
  const [input, setInput] = useState(initState);

  // handle Input Change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // reset form
  const resetForm = () => {
    setInput(initState);
  };

  return { input, handleInputChange, resetForm, setInput };
};

export default useFormFeilds;
