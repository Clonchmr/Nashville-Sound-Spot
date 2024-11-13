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

export const GetUserFavorites = (userId) => {
  return fetch(`http://localhost:8088/fanFavoriteBands?userId=${userId}`).then(
    (res) => res.json()
  );
};

export const GetCurrentFavorite = (bandId) => {
  return fetch(`http://localhost:8088/fanFavoriteBands?bandId=${bandId}`).then(
    (res) => res.json()
  );
};
