Développer une mini API pour une application de gestion de tâches.
La stack demandée est la suivante :
• NodeJS
• Express
• MongoDB

Fonctionnalités :
Chaque utilisateur peut :
• Créer des tâches
• Assigner des tâches à d’autres utilisateurs
• Marquer ses tâches comme terminées
• Consulter ses tâches

Routes demandées :
• POST /task : créer une tâche
• GET /tasks : liste des tâches assignées à l’utilisateur courant
• PATCH /tasks/:id

Authentification :
Un middleware d’authentification simplifié est requis.
• Authentification via le numéro de téléphone de l’utilisateur transmis dans un header

Cron job :
• Lors de la création d’une tâche (POST /task), une date d’exécution (executionDate) doit être renseignée.
• À la date et l’heure définies dans executionDate, un console.log doit afficher le numéro de téléphone de l’utilisateur assigné à cette tâche.

Tips :
• Tu peux modifier la structure des fichiers si besoin
• Tu peux utiliser des packages tiers si besoin
