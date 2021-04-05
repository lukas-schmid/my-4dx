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
//   "leadInterval": "weekly"
// }

export function addUserLeadMeasure(wigId, leadId, userId, body) {
  const url = `https://my-4dx.herokuapp.com/api/${wigId}/leads/${leadId}/users/${userId}`;
  return postFetch(url, body);
}

// body = {
//     "leadName": "200 phone calls per day",
//     "leadInterval": "weekly",
//     "leadDataType": "number",
//     "benchmarkExists": false,
//     "benchmark": "100 calls per day",
// }

export function updateLead(wigId, leadId, body) {
  const url = `https://my-4dx.herokuapp.com/api/${wigId}/leads/${leadId}`;
  return putFetch(url, body);
}

export function deleteLead(wigId, leadId) {
  const url = `https://my-4dx.herokuapp.com/api/${wigId}/leads/${leadId}`;
  return deleteFetch(url);
}

// body = {
  // "category": "categoryName2",
  // "startDate": "2025-01-01",
  // "commitmentName": "this is another the commitmentName"
// }

export function createCommitment(userId, body) {
  const url = `https://my-4dx.herokuapp.com/api/commitments/${userId}`;
  return postFetch(url, body);
}


// body = {
  // "startDate": "2025-01-01",
  // "commitmentName": "this is another the commitmentName2.2",
  // "isCompleted": true
// }

export function updateCommitment(commitmentId, userId, body) {
  const url = `https://my-4dx.herokuapp.com/api/commitments/${commitmentId}/users/${userId}`;
  return putFetch(url, body);
}

export function deleteCommitment(commitmentId) {
  const url = `https://my-4dx.herokuapp.com/api/commitments/${commitmentId}`;
  return deleteFetch(url);
}