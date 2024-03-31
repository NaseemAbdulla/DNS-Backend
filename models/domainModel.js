const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  domain: { type: String, required: true, unique: true },
  id:{type:String,unique:true},
  records: [
    {
      type: { type: String, required: true, enum: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC'] },
      name: { type: String, required: true },
      id:{type:String,unique:true},
      value: { type: String, required: true },
      ttl: { type: Number, default: 3600 },
      priority: { type: Number },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }
  ]
});

const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;