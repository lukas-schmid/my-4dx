import { postFetch, getFetch, putFetch, deleteFetch } from "./fetchFunctions";

// body = {
//     email: "demo-admin@my-4dx.herokuapp.com",
//     password: "passwort123",
//     name: "John Doe",
//     companyName: "yourCompany ltd",
//     teamName: "Sales Team",
//     title: "Team Lead Sales",
//   };

export async function register(body) {
  const url = "https://my-4dx.herokuapp.com/api/register";
  const response = await postFetch(url, body);
  return response;
}

// body = {
//     email: "demo-admin@my-4dx.herokuapp.com",
//     password: "passwort123",
//   };

export function login(body) {
  const url = "https://my-4dx.herokuapp.com/api/login";
  return postFetch(url, body);
}

// get all members from Team
export function getTeamMembers(teamId) {
  const url = `https://my-4dx.herokuapp.com/api/members/${teamId}`;
  return getFetch(url);
}

// body = {
//     email: "demo-admin@my-4dx.herokuapp.com",
//   };

export function sendPasswordReset(body) {
  const url = "https://my-4dx.herokuapp.com/api/members/passwordreset";
  return postFetch(url, body);
}

// body = {
//     "email": "demo-user@my-4dx.herokuapp.com",
//     "password": "password123",
//     "name": "Jane Doe",
//     "companyName": "yourCompany ltd",
//     "teamId": "ea67c8dd-XXXX-XXXX-XXXX-01a0f22b55a3",
//     "teamName": "Sales Team",
//     "title": "Marketing"
// }

export async function addMember(body) {
  const url = "https://my-4dx.herokuapp.com/api/members";
  const response = await postFetch(url, body);
  return response;
}

// body = {
// "email": "firstname.lastname@example.com",
// "name": "Tom Johnson",
// "companyName": "XYZ ltd",
// "teamId": "0af5baa1-XXXX-XXXX-XXXX-55830fa3009b",
// "teamName": "Sales Team",
// "title": "Marketing"
// "isAdmin": true,
// "scoreboardInclude": true
//   };

export function updateMember(userId, body) {
  const url = `https://my-4dx.herokuapp.com/api/members/${userId}`;
  return putFetch(url, body);
}

export function deleteMember(userId, body) {
  const url = `https://my-4dx.herokuapp.com/api/members/${userId}`;
  return deleteFetch(url, body);
}

// maybe not necessary?! maybe for proper logout on google firebase

export function logout() {
  const url = "https://my-4dx.herokuapp.com/api/logout";
  return postFetch(url);
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

export function getAllWigsByTeamId(teamId) {
  const url = `https://my-4dx.herokuapp.com/api/wigs/${teamId}`;
  return getFetch(url);
}

// body = {
//   "leadName": "999 phone calls per day",
//   "leadInterval": "daily",
//   "leadDataType": "money",
//   "benchmarkExists": false,
//   "benchmark": "some calls"
// }

export function createLead(wigId, body) {
  const url = `https://my-4dx.herokuapp.com/api/${wigId}/leads`;
  return postFetch(url, body);
}

// body = {
//   "leadName": "999 phone calls per day",
//   "leadInterval": "daily",
//   "leadDataType": "money",
//   "benchmarkExists": false,
//   "benchmark": "some calls",
//   "leadData": [
//       {
//           "startDate": "2020-07-01",
//           "data": 20
//       }
//   ]
// }

// export function updateLead(wigId, leadId, body) {
//   const url = `https://my-4dx.herokuapp.com/api/${wigId}/leads/${leadId}`;
//   return putFetch(url, body);
// }

export function deleteLead(wigId, leadId) {
  const url = `https://my-4dx.herokuapp.com/api/${wigId}/leads/${leadId}`;
  return deleteFetch(url);
}

export function getAllCommitmentsByWigId(wigId) {
  const url = `https://my-4dx.herokuapp.com/api/commitments/wigs/${wigId}`;
  return getFetch(url);
}

export function getAllCommitmentsByUserId(userId) {
  const url = `https://my-4dx.herokuapp.com/api/commitments/${userId}`;
  return getFetch(url);
}

// body = {
//    "commitmentName": "make 200 calls",
//    "startDate": "2021-01-15",
//    "wigId": "0ed521b7-XXXX-XXXX-XXXX-249bb09e5e02",
//    "wigName":"increase sales by 40%",
//    "leadId": "a3217c85-XXXX-XXXX-XXXX-0f7da5ad63d7",
//    "category":"category name"
// }

export function createCommitment(userId, body) {
  const url = `https://my-4dx.herokuapp.com/api/commitments/${userId}`;
  return postFetch(url, body);
}


// body = {
//    "userId": "dba7fdcc-XXXX-XXXX-XXXX-079b21e40733",
//    "commitmentName": "make 200 calls",
//    "startDate": "2021-01-15",
//    "wigId": "0ed521b7-XXXX-XXXX-XXXX-249bb09e5e02",
//    "wigName":"increase sale by 40%",
//    "leadId": "a3217c85-XXXX-XXXX-XXXX-0f7da5ad63d7",
//    "category":"category name"
// }

export function updateCommitment(commitmentId, body) {
  const url = `https://my-4dx.herokuapp.com/api/commitments/${commitmentId}`;
  return putFetch(url, body);
}

export function deleteCommitment(commitmentId) {
  const url = `https://my-4dx.herokuapp.com/api/commitments/${commitmentId}`;
  return deleteFetch(url);
}