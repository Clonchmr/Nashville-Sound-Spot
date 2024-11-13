export const GetAllVenues = () => {
  return fetch("http://localhost:8088/venues").then((res) => res.json());
};

export const GetVenueById = (venueId) => {
  return fetch(`http://localhost:8088/venues/${venueId}`).then((res) =>
    res.json()
  );
};

export const GetShowsByVenue = (venueId) => {
  return fetch(
    `http://localhost:8088/shows?venueId=${venueId}&_expand=band`
  ).then((res) => res.json());
};
