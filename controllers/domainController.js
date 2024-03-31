const Domain = require('../models/domainModel');

// Get all domains
exports.getAllDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
    res.json("hello")
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single domain
exports.getDomainById = async (req, res) => {
  try {
    const domain = await Domain.findById(req.params.id);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json(domain);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new domain
exports.createDomain = async (req, res) => {
  const domain = new Domain(req.body);
  try {
    const newDomain = await domain.save();
    res.status(201).json(newDomain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a domain
exports.updateDomain = async (req, res) => {
  try {
    const domain = await Domain.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json(domain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a domain
exports.deleteDomain = async (req, res) => {
  try {
    const domain = await Domain.findByIdAndDelete(req.params.id);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.json({ message: 'Domain deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create a new record for a domain
exports.createRecord = async (req, res) => {
    try {
      const domain = await Domain.findById(req.params.domainId);
      if (!domain) {
        return res.status(404).json({ message: 'Domain not found' });
      }
  
      const newRecord = {
        type: req.body.type,
        name: req.body.name,
        value: req.body.value,
        ttl: req.body.ttl || 3600,
        priority: req.body.priority
      };
  
      domain.records.push(newRecord);
      const updatedDomain = await domain.save();
      res.status(201).json(updatedDomain);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Update a record for a domain
  exports.updateRecord = async (req, res) => {
    try {
      const domain = await Domain.findById(req.params.domainId);
      if (!domain) {
        return res.status(404).json({ message: 'Domain not found' });
      }
  
      const recordIndex = domain.records.findIndex(record => record._id.toString() === req.params.recordId);
      if (recordIndex === -1) {
        return res.status(404).json({ message: 'Record not found' });
      }
  
      const updatedRecord = {
        ...domain.records[recordIndex],
        ...req.body
      };
  
      domain.records[recordIndex] = updatedRecord;
      const updatedDomain = await domain.save();
      res.json(updatedDomain);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Delete a record for a domain
  exports.deleteRecord = async (req, res) => {
    try {
      const domain = await Domain.findById(req.params.domainId);
      if (!domain) {
        return res.status(404).json({ message: 'Domain not found' });
      }
  
      const recordIndex = domain.records.findIndex(record => record._id.toString() === req.params.recordId);
      if (recordIndex === -1) {
        return res.status(404).json({ message: 'Record not found' });
      }
  
      domain.records.splice(recordIndex, 1);
      const updatedDomain = await domain.save();
      res.json(updatedDomain);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
