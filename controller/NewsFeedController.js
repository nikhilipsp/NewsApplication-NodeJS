var newsFeedService = require('../service/NewsFeedService');
const fs = require("fs-extra");

async function newsFeed(req, res) {
    try {
        let files = req.file;
        console.log("*************** value of req.body is");
        console.log(req.body);
        console.log(req.file);

        if (req.file == undefined) {
            return res.status(400).json(`You must select an image file.`);
        }
        if (req.body.category && req.body.authorName && req.body.headline) {
            newsFeedService.newsFeed(req.body, files, async function (err, result) {
                if (err) {
                    fs.unlinkSync('./tmp/' + req.file.filename.replace(/\s/g, ""));
                    console.log("File is deleted.");
                    return res.status(400).json({ status: "error", data: { error: err } });
                }
                res.json({ status: "success", data: result });
            })
        } else {
            fs.unlinkSync('./tmp/' + req.file.filename.replace(/\s/g, ""));
            console.log("File is deleted.");
            return res.status(400).json(`Field is mandatory.`);
        }
    } catch (error) {
        console.log(error);
        fs.unlinkSync('./tmp/' + req.file.filename.replace(/\s/g, ""));
        console.log("File is deleted.");
        res.status(400).json("some error occured");
    }

}

async function filterNews(req, res) {
    console.log("************** value of req.query is");
    console.log(req.query);
    newsFeedService.filterNews(req.query, async function (err, result) {
        if (err)
            return res.status(400).json({ status: "error", data: { error: err.toString() } });
        res.json({ status: "success", data: result });
    })
}

async function searchNews(req, res) {
    console.log("************** value of req.query is");
    console.log(req.query);
    newsFeedService.searchNews(req.query, async function (err, result) {
        if (err)
            return res.status(400).json({ status: "error", data: { error: err.toString() } });
        res.json({ status: "success", data: result });
    })
}

module.exports.newsFeed = newsFeed
module.exports.filterNews = filterNews
module.exports.searchNews = searchNews