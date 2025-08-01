import { Children, createContext, useState } from "react";

const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  });
  
  return (
    <div>
      <CaptainDataContext.Provider value={(captain, setCaptain)}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;
export { CaptainDataContext };
