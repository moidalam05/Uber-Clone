import { createContext, useState } from "react";

const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  return (
    <div>
      <CaptainDataContext.Provider value={{ captain, setCaptain }}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;
export { CaptainDataContext };
