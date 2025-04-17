#!/bin/bash

BASE_URL="mongodb+srv://olivier:Az4BFhULigMSmyXY@cluster0.0vxjz74.mongodb.net/olivier?retryWrites=true&w=majority&appName=Cluster0"
USER1="+33600000001"
USER2="+33600000002"

echo "Test 1: Ping server"
curl -X POST $BASE_URL/ping

echo -e "\n\nTest 2: Create task as User 1"
RESPONSE=$(curl -s -X POST $BASE_URL/task \
  -H "Content-Type: application/json" \
  -H "phone-number: $USER1" \
  -d '{
    "title": "Première tâche",
    "description": "Description de la première tâche",
    "assignedTo": "'$USER2'",
    "executionDate": "2025-04-17T15:00:00.000Z"
  }')
echo $RESPONSE

# Extraire l'ID de la tâche créée pour les tests suivants
TASK_ID=$(echo $RESPONSE | grep -o '"_id":"[^"]*"' | cut -d':' -f2 | tr -d '"')

echo -e "\n\nTest 3: User 2 checks assigned tasks"
curl -X GET $BASE_URL/tasks \
  -H "phone-number: $USER2"
