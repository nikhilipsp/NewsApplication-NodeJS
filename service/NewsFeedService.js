require('dotenv').config();
var path = require('path');
const db = require('../db/connection')
var newsFeedDb = db.sequelize.import(path.join(__dirname, '../db/models/newsfeed.js'))

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


async function newsFeed(body, files, callback) {
    try {
        console.log("*************** value of body is");
        console.log(body);
        let newNews = await newsFeedDb.create({
            thumbnail: files.path,
            headline: body.headline,
            category: body.category,
            authorName: body.authorName
        })
        callback(null, newNews)
    }
    catch (error) {
        console.log(error)
        callback(new Error("error in creating news feed"));
    }
}

exports.filterNews = async function (req, callback) {
    try {
        console.log("******** value of req in service is");
        console.log(req);
        var searchQuery = {}

        if (typeof req.category !== 'undefined') {
            let catgList = req.category.split(",");
            console.log("************ value of catgList is");
            console.log(catgList);
            searchQuery.category = {
                [Op.or]: [catgList]
            }
        }
        if (typeof req.authorName !== 'undefined') {
            let authList = req.authorName.split(",");
            console.log("************ value of authList is");
            console.log(authList);
            searchQuery.authorName = {
                [Op.or]: [authList]
            }
        }
        console.log("******* value of searchQuery is");
        console.log(searchQuery);
        let newsFilter = await newsFeedDb.findAll({ where: searchQuery, order: [['createdAt', 'DESC']] });
        callback(null, newsFilter);
    } catch (error) {
        console.log(error);
        callback(new Error(error));
    }
}

exports.searchNews = async function (req, callback) {
    try {
        console.log("******** value of req in service is");
        console.log(req);
        let newsSearch = await newsFeedDb.findAll({
            where: {
                [Op.or]: [
                    { headline: req.keyword },
                    { category: req.keyword },
                    { authorName: req.keyword }
                ]
            }, order: [['createdAt', 'DESC']]
        });
        callback(null, newsSearch);
    } catch (error) {
        console.log(error);
        callback(new Error(error));
    }
}

module.exports.newsFeed = newsFeed