const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('./db');

/* GET users listing. */
router.get('/grn', function(req, res, next) {
  res.send('get.get(\'ac\', ...)');
});
/**
 * 前台 查全部文章
 * sort by created
 * inflated the article's ref (author and category)
 * return data to the front
 * query by category and author
 * slice the pages : curPage-current page; pageSize-count pre page; pageCount-total pages
 *
 * type:get
 * Parameters: /articel?page=n
 * Response:{
 *      result:[{Article}],
        pageCount:n,
        curPage:n,
 * }
 */
router.get('/gene', function(req, res, next){
    const keyword= req.query.keyword;
    const conditions={};
    if(keyword){
      conditions.title=new RegExp(keyword.trim(), 'i');
      conditions.content=new RegExp(keyword.trim(), 'i');
    }
    db.Matrix.find(conditions)
        .exec(function(err, result){
            console.log('With' + JSON.stringify(conditions) + ', get all genes: ' + JSON.stringify(result));

            if ( err ) throw next(err);

            res.status(200).send(result).end();
        });
});


/**
 * 前端查一个AC
 * type:get
 * Parameters: /ac/id || /ac/slug
 * Response:{Record}
 */
router.get('/gene/:AC', function (req, res, next) {
  if(!req.params.AC){
    return next(new Error('未提供查询字段'));
  }

  let conditions = {};

  conditions.AC = req.params.AC;

  db.Gene.findOne(conditions).exec(function(err, gene){
    console.log('Found' + JSON.stringify(gene) + ' with params: ' + JSON.stringify(conditions));
    if ( err ) throw err;
    res.status(200).send(JSON.stringify(gene)).end();
  });
});

module.exports = router;
