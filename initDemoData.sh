#!/bin/bash
# execute file in terminal with command  "bash initDemoData.sh"

# 1. register and login
# 1.1 post("/api/register")

body=$(jq -n --arg b "$teamId" '{
    "email": "demo-admin@my-4dx.herokuapp.com",
    "password": "passwort123",
    "name": "John Doe",
    "companyName": "yourCompany ltd",
    "teamName": "Sales Team",
    "title": "Team Lead Sales"
}')

echo "POST http://localhost:8080/api/register"
echo "request body: $body"
teamId=$(curl -w "\n" -d "$body" -H 'Content-Type: application/json' http://localhost:8080/api/register | jq .teamId)

# 2. user management
# 2.3 post("/api/members")
body=$(jq -n --arg b "$teamId" '{
    "email": "demo-user@my-4dx.herokuapp.com",
    "password": "password123",
    "name": "Jane Doe",
    "companyName": "yourCompany ltd",
    "teamId": '$teamId',
    "teamName": "Sales Team",
    "title": "Marketing"
}')

echo "POST http://localhost:8080/api/members"
echo "request body: $body"
curl -w "\n" -d "$body" -H 'Content-Type: application/json' http://localhost:8080/api/members | jq .

# 3. WIG
# 3.1 post("/api/wigs")


# 3.2 put("/api/wigs/:wigId)
# 3.3 delete("/api/wigs/:wigId)

# 4. Leads
# 4.1 post("/api/leads")
# 4.2 put("/api/leads/:leadId")

# 5. Lag
# 5.1 put("/api/lag/:wigId")

# 6. Commitments
# 6.1 get("/api/commitments/:userId")
# 6.2 post("/api/commitments/:userId")
# 6.3 put("/api/commitments/:commitmentId")
# 6.4 delete("/api/commitments/:commitmentId")

# 7. scoreboard
# 7.1 post("/api/scoreb)
