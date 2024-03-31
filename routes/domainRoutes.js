const express = require('express');
const router = express.Router();
const domainController = require('../controllers/domainController');

// Routes
router.get('/', domainController.getAllDomains);
router.get('/:domainId/records', domainController.getRecordsByDomainId);
router.post('/', domainController.createDomain);

router.delete('/:id', domainController.deleteDomain);

router.post('/:domainId/records', domainController.createRecord);
router.put('/:domainId/records/:recordId', domainController.updateRecord);
router.delete('/:domainId/records/:recordId', domainController.deleteRecord);
module.exports = router;