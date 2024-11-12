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
