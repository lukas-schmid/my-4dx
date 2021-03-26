import React, { useState, useEffect } from "react";

function HelloWorld() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api")
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
