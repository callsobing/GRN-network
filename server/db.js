const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;

const GeneSchema = new Schema({
  _id : Schema.Types.ObjectId,
	AC: {type:String, require:true},
	AS: {type:String},
	ID: {type:String},
	DT: {type:String},
	SD: {type:String},
	DE: {type:String},
	OS: {type:String},
	OC: {type:String},
	SY: {type:String},
	CH: {type:String},
	HG: {type:String},
	IG: {type:String},
	BC: {type:String},
	RG: {type:String},
	BS: {type:String},
	BR: {type:String},
	CE: {type:String},
	FA: {type:String},
	DR: {type:String},
	CC: {type:String},
	DR2: {type:String},
	RN: {type:String},
	RX: {type:String},
	RA: {type:String},
	RT: {type:String},
	RL: {type:String}
});

const FactorSchema = new Schema({
	_id : Schema.Types.ObjectId,
	AC: {type: String, require: true},
	AS: {type: String},
	ID: {type: String},
	DT: {type: String},
	FA: {type: String},
	SY: {type: String},
	OS: {type: String},
	OC: {type: String},
	GE: {type: String},
	HO: {type: String},
	CL: {type: String},
	TY: {type: String},
	HP: {type: String},
	HC: {type: String},
	SZ: {type: String},
	SQ: {type: String},
	SC: {type: String},
	FT: {type: String},
	SF: {type: String},
	CP: {type: String},
	CN: {type: String},
	EX: {type: String},
	FF: {type: String},
	IN: {type: String},
	ST: {type: String},
	CX: {type: String},
	MX: {type: String},
	BS: {type: String},
	BR: {type: String},
	DR: {type: String},
	RN: {type: String},
	RX: {type: String},
	RA: {type: String},
	RT: {type: String},
	RL: {type: String}
});

const SiteSchema = new Schema({
  _id : Schema.Types.ObjectId,
	AC: {type:String, require:true},
	AS: {type:String},
	ID: {type:String},
	DT: {type:String},
	TY: {type:String},
	DE: {type:String},
	OS: {type:String},
	OC: {type:String},
	RE: {type:String},
	SQ: {type:String},
	EL: {type:String},
	S1: {type:String},
	SF: {type:Number},
	ST: {type:Number},
	SC: {type:String},
	BF: {type:String},
	MX: {type:String},
	SO: {type:String},
	MM: {type:String},
	CC: {type:String},
	DR: {type:String},
	RN: {type:String},
	RX: {type:String},
	RA: {type:String},
	RT: {type:String},
	RL: {type:String}
});

const GeneFactorSiteSchema = new Schema({
	_id : Schema.Types.ObjectId,
	AC: {type:String, require:true},
	AS: {type:String},
	ID: {type:String},
	DT: {type:String},
});

const Models={
  // Mongoose#model(name, [schema], [collection], [skipInit])
  Gene : mongoose.model('Gene', GeneSchema, 'gene'),
  Factor : mongoose.model('Factor', FactorSchema, 'factor'),
  Site : mongoose.model('Site', SiteSchema, 'site'),
	GeneFactorSite: mongoose.model('gene_factor_site', GeneFactorSiteSchema, 'gene_factor_site')
};

/**
 * 创建数据库名称并连接
 * Connecting to Mongod instance.
 */
const dbHost = 'mongodb://localhost:27017/GRN';
mongoose.connect(dbHost);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('The Database has connected.')
});

module.exports = Models;
