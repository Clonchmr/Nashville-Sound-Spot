export const CreateNewBand = (bandObj) => {
  return fetch("http://localhost:8088/bands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bandObj),
  });
};

export const GetBandsByUser = async (userId) => {
  const response = await fetch(`http://localhost:8088/bands?userId=${userId}`);
  const data = await response.json();

  return Array.isArray(data) ? data : [data];
};

export const GetBandById = (bandId) => {
  return fetch(`http://localhost:8088/bands/${bandId}?_expand=genre`).then(
    (res) => res.json()
  );
};

export const UpdateBand = (bandId, bandObj) => {
  return fetch(`http://localhost:8088/bands/${bandId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bandObj),
  });
};

export const DeleteBand = (bandId) => {
  return fetch(`http://localhost:8088/bands/${bandId}`, {
    method: "DELETE",
  });
};
