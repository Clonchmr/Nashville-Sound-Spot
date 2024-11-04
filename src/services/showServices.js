export const CreateNewShow = (showObj) => {
  return fetch(`http://localhost:8088/shows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(showObj),
  });
};
