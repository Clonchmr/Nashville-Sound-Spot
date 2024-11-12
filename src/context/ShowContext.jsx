import { createContext, useContext, useEffect, useState } from "react";
import { GetAllShows } from "../services/showServices";

const ShowContext = createContext();

export const ShowProvider = ({ children }) => {
  const [allShows, setAllShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState(allShows);

  useEffect(() => {
    GetAllShows().then(setAllShows);
  }, []);

  const handleUpdateShow = (updatedShow) => {
    setAllShows((prevShows) =>
      prevShows.map((show) => (show.id === updatedShow.id ? updatedShow : show))
    );
    setFilteredShows((prevShows) =>
      prevShows.map((show) => (show.id === updatedShow.id ? updatedShow : show))
    );
  };

  return (
    <ShowContext.Provider
      value={{
        allShows,
        filteredShows,
        setFilteredShows,
        handleUpdateShow,
        setAllShows,
      }}
    >
      {children}
    </ShowContext.Provider>
  );
};

export const useShowContext = () => useContext(ShowContext);
