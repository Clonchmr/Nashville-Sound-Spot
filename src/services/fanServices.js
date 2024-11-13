export const GetFanById = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then((res) =>
    res.json()
  );
};

export const GetAllBands = () => {
  return fetch(`http://localhost:8088/bands?_expand=genre`).then((res) =>
    res.json()
  );
};

export const GetAllGenres = () => {
  return fetch(`http://localhost:8088/genres`).then((res) => res.json());
};

export const AddFavoriteBand = (bandObj) => {
  return fetch(`http://localhost:8088/fanFavoriteBands`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bandObj),
  });
};

export const RemoveFavoriteBand = (favoriteBandId) => {
  return fetch(`http://localhost:8088/fanFavoriteBands/${favoriteBandId}`, {
    method: "DELETE",
  });
};

export const GetUserBandFavorites = (userId) => {
  return fetch(`http://localhost:8088/fanFavoriteBands?userId=${userId}`).then(
    (res) => res.json()
  );
};

export const GetCurrentFavoriteBand = (bandId) => {
  return fetch(`http://localhost:8088/fanFavoriteBands?bandId=${bandId}`).then(
    (res) => res.json()
  );
};

export const GetCurrentFavoriteVenue = (venueId) => {
  return fetch(
    `http://localhost:8088/fanFavoriteVenues?venueId=${venueId}`
  ).then((res) => res.json());
};

export const GetFavoriteVenuesByUser = (userId) => {
  return fetch(`http://localhost:8088/fanFavoriteVenues?userId=${userId}`).then(
    (res) => res.json()
  );
};

export const AddFavoriteVenue = (venueObj) => {
  return fetch(`http://localhost:8088/fanFavoriteVenues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venueObj),
  });
};

export const RemoveFavoriteVenue = (favoriteId) => {
  return fetch(`http://localhost:8088/fanFavoriteVenues/${favoriteId}`, {
    method: "DELETE",
  });
};
