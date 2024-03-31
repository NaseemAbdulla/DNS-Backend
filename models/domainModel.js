const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  domain: { type: String, required: true, unique: true },
  id:{type:String,unique:true,required:true},
  createdAt: { type: Date, default: Date.now ,required:true},
  records: [
    {
      type: { type: String, required: true, enum: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC'] },
      name: { type: String, required: true },
      id:{type:String,unique:true,required:true},
      value: { type: String, required: true },
      ttl: { type: Number, default: 3600 ,required:true},
      priority: { type: Number },
      createdAt: { type: Date, default: Date.now ,required:true},
      updatedAt: { type: Date, default: Date.now ,required:true}
    }
  ]
});

const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;