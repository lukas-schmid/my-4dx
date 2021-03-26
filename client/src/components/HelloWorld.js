import React, { useState, useEffect } from "react";

function HelloWorld() {
  const [message, setMessage] = useState(null);

  const url =
    window.location.hostname === "localhost" ? "http://localhost:8080" : "";

  useEffect(() => {
    fetch(`${url}/api`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessage(data[0].message);
      })
      .catch((err) => console.error(err));
  }, []);

  return <div>{message ? <p>{message}</p> : "Loading..."}</div>;
}

export default HelloWorld;
