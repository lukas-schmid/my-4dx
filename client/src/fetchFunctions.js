export async function postFetch(url, reqBody) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  };
  try {
    const json = await fetch(url, requestOptions);
    const data = await json.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getFetch(url) {
  try {
    const json = await fetch(url);
    const data = await json.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function putFetch(url, reqBody) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  };
  try {
    const json = await fetch(url, requestOptions);
    const data = await json.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function deleteFetch(url) {
  try {
    return await fetch(url, {
      method: "DELETE",
    });
  } catch (error) {
    return error;
  }
}
