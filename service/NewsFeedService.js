require("dotenv").config();
var path = require("path");
const db = require("../db/connection");
var newsFeedDb = db.sequelize.import(
  path.join(__dirname, "../db/models/newsfeed.js")
);

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function newsFeed(body, files, callback) {
  try {
    let newNews = await newsFeedDb.create({
      thumbnail: files.path,
      headline: body.headline,
      category: body.category,
      authorName: body.authorName,
    });
    callback(null, newNews);
  } catch (error) {
    console.log(error);
    callback(new Error("error in creating news feed"));
  }
}

exports.filterNews = async function (req, callback) {
  try {
    var searchQuery = {};

    if (typeof req.category !== "undefined") {
      let catgList = req.category.split(",");

      searchQuery.category = {
        [Op.or]: [catgList],
      };
    }
    if (typeof req.authorName !== "undefined") {
      let authList = req.authorName.split(",");

      searchQuery.authorName = {
        [Op.or]: [authList],
      };
    }

    let newsFilter = await newsFeedDb.findAll({
      where: searchQuery,
      order: [["createdAt", "DESC"]],
    });
    callback(null, newsFilter);
  } catch (error) {
    console.log(error);
    callback(new Error(error));
  }
};

exports.searchNews = async function (req, callback) {
  try {
    if (req.keyword) {
      let newsSearch = await newsFeedDb.findAll({
        where: {
          [Op.or]: [
            { headline: req.keyword },
            { category: req.keyword },
            { authorName: req.keyword },
          ],
        },
        order: [["createdAt", "DESC"]],
      });
      callback(null, newsSearch);
    } else if (req.page) {
      if (req.pageNumber) {
        var recordsToSkip = (req.pageNumber - 1) * req.page;
      }
      let pageValue = await newsFeedDb.findAll();
      // console.log(pageValue);
      var loopObj = [];
      for (let i = recordsToSkip; i <= recordsToSkip + req.page; i++) {
        loopObj.push(pageValue[i]);
      }

      callback(null, loopObj);
    } else {
      let secondValue = await newsFeedDb.findAll();
      callback(null, secondValue);
    }
  } catch (error) {
    console.log(error);
    callback(new Error(error));
  }
};

module.exports.newsFeed = newsFeed;
