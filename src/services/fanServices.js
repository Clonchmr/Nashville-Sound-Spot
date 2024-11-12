export const GetFanById = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then((res) =>
    res.json()
  );
};
