#!/bin/bash
# execute file in terminal with command  "bash initDemoData.sh"

# 1. register and login
# 1.1 post("/api/register")

body=$(jq -n --arg b "$teamId" '{
    "email": "demo-admin@my-4dx.herokuapp.com",
    "password": "password123",
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
    "title": "Sales Representative",
    "isAdmin": false,
    "scoreboardInclude": true,
}')

echo "POST http://localhost:8080/api/members"
echo "request body: $body"
curl -w "\n" -d "$body" -H 'Content-Type: application/json' http://localhost:8080/api/members | jq .

# 3. WIG
# 3.1 post("/api/wigs")
# weekly intervals
body=$(jq -n --arg b "$teamId" '{
    "wigName": "Increase percent of annual revenue from new products from 15 percent to 21 percent by December 31st",
    "teamId": '$teamId',
    "lagName":"Monthly Sales",
    "lagDataType": "money",
    "lagCurrency": "SEK",
    "lagInterval": "weekly",
    "startDate": "2021-01-15",
    "endDate": "2021-02-28"
}')

echo "POST http://localhost:8080/api/wigs"
echo "request body: $body"
wigId=$(curl -w "\n" -d "$body" -H 'Content-Type: application/json' http://localhost:8080/api/wigs | jq -r .wigId)

# monthly intervals
# body=$(jq -n --arg b "$teamId" '{
#     "wigName": "increase sale by 70%",
#     "teamId": '$teamId',
#     "lagName":"increase sale calls",
#     "lagDataType": "money",
#     "lagCurrency": "SEK",
#     "lagInterval": "monthly",
#     "startDate": "2021-01-15",
#     "endDate": "2021-03-31"
# }')

# echo "POST http://localhost:8080/api/wigs"
# echo "request body: $body"
# curl -w "\n" -d "$body" -H 'Content-Type: application/json' http://localhost:8080/api/wigs | jq .


# 4. Leads
# 4.1 post("/api/:wigId/leads")
body=$(jq -n --arg b "$teamId" '{
    "leadName": "1000 phone calls per day",
    "leadInterval": "daily",
    "leadDataType": "percent",
    "benchmarkExists": true,
    "benchmark": "20000 calls",
}')

echo "POST http://localhost:8080/api/$wigId/leads"
echo "request body: $body"
leadId=$(curl -w "\n" -d "$body" -H 'Content-Type: application/json' http://localhost:8080/api/"$wigId"/leads | jq -r .leadMeasures[0].leadId)

# 4.2 put("/api/:wigId/leads/:leadId")
# body=$(jq -n --arg b "$teamId" '{
#     "leadName": "999 phone calls per day",
#     "leadInterval": "daily",
#     "leadDataType": "money",
#     "benchmarkExists": false,
#     "benchmark": "555",
#     "leadData": [
#         {
#             "startDate": "2020-07-01",
#             "data": 20
#         }
#     ]
# }')

# echo "PUT http://localhost:8080/api/$wigId/leads/$leadId"
# echo "request body: $body"
# curl -w "\n" -d "$body" -H 'Content-Type: application/json' -X PUT http://localhost:8080/api/"$wigId"/leads/"$leadId" | jq .









# 5. Lag
# 5.1 put("/api/lag/:wigId")

# 6. Commitments
# 6.1 get("/api/commitments/:userId")
# 6.2 post("/api/commitments/:userId")
# 6.3 put("/api/commitments/:commitmentId")
# 6.4 delete("/api/commitments/:commitmentId")

# 7. scoreboard
# 7.1 post("/api/scoreb)
