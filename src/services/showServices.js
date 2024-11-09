export const GetAllShows = () => {
  return fetch(`http://localhost:8088/shows?_expand=band&_expand=venue`).then(
    (res) => res.json()
  );
};

export const GetShowsByBandId = (bandId) => {
  return fetch(
    `http://localhost:8088/shows?bandId=${bandId}&_expand=venue`
  ).then((res) => res.json());
};

export const CreateNewShow = (showObj) => {
  return fetch(`http://localhost:8088/shows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(showObj),
  });
};

export const CancelShow = (showId) => {
  return fetch(`http://localhost:8088/shows/${showId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const GetShowById = (showId) => {
  return fetch(`http://localhost:8088/shows/${showId}`).then((res) =>
    res.json()
  );
};

export const EditShowDetails = (showId, showObj) => {
  return fetch(`http://localhost:8088/shows/${showId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(showObj),
  });
};
