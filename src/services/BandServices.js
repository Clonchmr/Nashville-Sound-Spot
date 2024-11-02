export const CreateNewBand = (bandObj) => {
  return fetch("http://localhost:8088/bands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bandObj),
  });
};
