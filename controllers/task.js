const Task = require('../models/Task');
const schedule = require('node-schedule');

// Planifier une notification pour la tâche
const scheduleTaskNotification = (task) => {
    const jobId = `task-${task._id}`;
    
    // Annuler le job existant s'il y en a un
    const existingJob = schedule.scheduledJobs[jobId];
    if (existingJob) {
        existingJob.cancel();
    }
    
    // Planifier le nouveau job
    schedule.scheduleJob(jobId, task.executionDate, function() {
        console.log(`Notification: Tâche "${task.title}" pour le numéro de téléphone ${task.assignedTo}`);
    });
};

const taskController = {
    // Créer une tâche
    createTask: async (req, res) => {

        console.log(req.user)
        try {
            const { title, description, assignedTo, executionDate } = req.body;
            
            if (!title || !assignedTo || !executionDate) {
                return res.status(400).json({ success: false, message: 'Titre, assignation et date d\'exécution sont requis' });
            }
            
            const task = await Task.create({
                title,
                description,
                createdBy: req.user._id,
                assignedTo,
                executionDate: new Date(executionDate),
            });
            
            // Planifier la notification
            scheduleTaskNotification(task);
            
            res.status(201).json({ success: true, data: task });
        } catch (error) {
            console.error('Erreur lors de la création de la tâche:', error);
            res.status(500).json({ success: false, message: 'Erreur lors de la création de la tâche' });
        }
    },
    
    // Lister les tâches assignées à l'utilisateur courant
    getUserTasks: async (req, res) => {
        try {
            const tasks = await Task.find({ assignedTo: req.user.phoneNumber });
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches:', error);
            res.status(500).json({ success: false, message: 'Erreur lors de la récupération des tâches' });
        }
    },
    
    // Mettre à jour une tâche
    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { isCompleted } = req.body;
            
            const task = await Task.findById(id);
            
            if (!task) {
                return res.status(404).json({ success: false, message: 'Tâche non trouvée' });
            }
            
            // Vérifier que l'utilisateur est assigné à cette tâche
            if (task.assignedTo !== req.user.phoneNumber) {
                return res.status(403).json({ success: false, message: 'Vous n\'êtes pas autorisé à modifier cette tâche' });
            }
            
            task.isCompleted = isCompleted;
            await task.save();
            
            res.status(200).json({ success: true, data: task });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche:', error);
            res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de la tâche' });
        }
    },
};

module.exports = taskController;