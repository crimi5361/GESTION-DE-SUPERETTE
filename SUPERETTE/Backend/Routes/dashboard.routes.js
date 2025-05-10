const express = require('express');
const route = express.Router();
const dashController = require('../Controllers/dashboardS.Controller');


route.get('/dashboard-stats', dashController.gestDashboardStats);


module.exports = route;