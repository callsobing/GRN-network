const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./db');


router.get('/gene_factor_site/test', function (req, res, next) {
  db.GeneFactorSite.findOne().exec(function(err, result){
    if ( err ) throw err;
    const msg = 'db.GeneFactorSite.findOne() -> ' + result
    console.log(msg)
    res.end(msg)
  });
});

// GET /gene_factor_site/T00001
router.get('/gene_factor_site/:AC', function (req, res, next) {
  const conditions = {'AC': req.params.AC}

  db.GeneFactorSite.findOne(conditions).exec(function(err, result){
    if ( err ) throw err;
    if (result) {
      console.log('> GRN.gene_factor_site.findOne(' + JSON.stringify(conditions) + ') -> ' + JSON.stringify(result).slice(0, 100) + '...');
      res.status(200).json(result);
    } else {
      console.log('> GRN.gene_factor_site.findOne(' + JSON.stringify(conditions) + ') -> ' + result);
      res.status(404).end();
    }
  });
});


// GET /gene/G000001
router.get('/gene/:AC', function (req, res, next) {
  const conditions = {'AC': req.params.AC}

  db.Gene.findOne(conditions).exec(function(err, result){
    if ( err ) throw err;
    if (result) {
      console.log('> GRN.gene_factor_site.findOne(' + JSON.stringify(conditions) + ') -> ' + JSON.stringify(result).slice(0, 100) + '...');
      res.status(200).json(result);
    } else {
      console.log('> GRN.gene.findOne(' + JSON.stringify(conditions) + ') -> ' + result);
      res.status(404).end();
    }
  });
});


// GET /findOne?key=AC&value=T00015
router.get('/findOne', function(req, res, next){

  const key = req.query.key
  const value = req.query.value
  if (!key || !value) {
    res.status(400).end();
    return
  }
  const conditions={};
  conditions[key] = value;

  db.GeneFactorSite.findOne(conditions).exec(function(err, result){
    if ( err ) throw err;
    if (result) {
      console.log('> GRN.gene_factor_site.findOne(' + JSON.stringify(conditions) + ') -> ' + JSON.stringify(result).slice(0, 200) + '...');
      res.status(200).json(result);
    } else {
      console.log('> GRN.gene.findOne(' + JSON.stringify(conditions) + ') -> ' + result);
      res.status(404).end();
    }
  });
});

module.exports = router;
