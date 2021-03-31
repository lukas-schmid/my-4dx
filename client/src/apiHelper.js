import { postFetch, getFetch, putFetch, deleteFetch } from "./fetchFunctions";

// body = {
//     email: "demo-admin@my-4dx.herokuapp.com",
//     password: "passwort123",
//     name: "John Doe",
//     companyName: "yourCompany ltd",
//     teamName: "Sales Team",
//     title: "Team Lead Sales",
//   };

export function register(body) {
  const url = "https://my-4dx.herokuapp.com/api/register";
  return postFetch(url, body);
}

// body = {
//     email: "demo-admin@my-4dx.herokuapp.com",
//     password: "passwort123",
//   };

export function login(body) {
  const url = "https://my-4dx.herokuapp.com/api/login";
  return postFetch(url, body);
}

// maybe not necessary?! maybe for proper logout on google firebase

export function logout() {
  const url = "https://my-4dx.herokuapp.com/api/logout";
  return postFetch(url, body);
}

// body = {
//   wigName: "increase sale by 70%",
//   lagName:"increase sale calls",
//   lagDataType: "money",
//   lagCurrency: "SEK",
//   lagInterval: "weekly",
//   startDate: "2021-01-15",
//   endDate: "2021-03-31"
//   };

export function createWig(body) {
  const url = "https://my-4dx.herokuapp.com/api/wigs";
  return postFetch(url, body);
}
