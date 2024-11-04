export const GetAllVenues = () => {
  return fetch("http://localhost:8088/venues").then((res) => res.json());
};
