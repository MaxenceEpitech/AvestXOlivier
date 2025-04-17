const express = require('express');
const router = express.Router();

const taskController = require('./controllers/task');
const authenticate = require('./middlewares/auth')

router.post('/ping', async (req, res) => {
    try {
        return res.status(200).send({ success: true, message: 'pong' });
    } catch (error) {
        ErrorHandler(req, res, error);
    }
});

// Ajout des routes authentifiées
router.post('/task', authenticate, taskController.createTask);
router.get('/tasks', authenticate, taskController.getUserTasks);
router.patch('/tasks/:id', authenticate, taskController.updateTask);


module.exports = router;
