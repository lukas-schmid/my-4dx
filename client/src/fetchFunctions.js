// export function postFetch(url, body) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   };
//   fetch(url, requestOptions)
//     .then(async (response) => {
//       const data = await response.json();
//       if (!response.ok) {
//         const error = (data && data.message) || response.status;
//         return Promise.reject(error);
//       }
//       return data;
//     })
//     .catch((error) => {
//       return error;
//     });
// }

export async function postFetch(url, reqBody) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }
  try {
    const json = await fetch(url, requestOptions);
    const data = await json.json();
    return data;
  } catch (error) {
    return error;
  }
}

export function getFetch(url) {
  fetch(url)
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      return error;
    });
}

export function putFetch(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  fetch(url, requestOptions)
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      return error;
    });
}

export function deleteFetch(url) {
  fetch(url, {
    method: "DELETE",
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      return data;
    })
    .catch((error) => {
      return error;
    });
}
