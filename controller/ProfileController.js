var profileService = require('../service/ProfileService');
const fs = require("fs-extra");
const emailvalidator = require("email-validator");

async function createProfile(req, res) {
    try {
        let files = req.file;
        console.log("*************** value of req.body is");
        console.log(req.body);
        console.log(req.file);

        if (req.file == undefined) {
            return res.status(400).json(`You must select an image file.`);
        }
        if (req.body.userName && req.body.email && req.body.password && req.body.phoneNumber && req.body.dateOfBirth && req.body.timeOfBirth && req.body.gender && req.body.maritalStatus && req.body.language) {
            if (emailvalidator.validate(req.body.email)) {

                let passwordCheck = req.body.password.replace(/\s+/g, "").split("");
                console.log("************** value of passwordCheck is");
                console.log(passwordCheck);
                if (passwordCheck.length >= 8) {
                    let mobNumbCheck = req.body.phoneNumber.replace(/[- )(]/g, '').split("");
                    console.log("*************** value of mobNumbCheck is");
                    console.log(mobNumbCheck);
                    if (mobNumbCheck.length === 10) {
                        profileService.createProfile(req.body, files, async function (err, result) {
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
                        res.status(400).send('Please enter a valid mobile number');
                    }
                } else {
                    fs.unlinkSync('./tmp/' + req.file.filename.replace(/\s/g, ""));
                    console.log("File is deleted.");
                    res.status(400).send('Password length should be minimum 8 characters');
                }
            } else {
                fs.unlinkSync('./tmp/' + req.file.filename.replace(/\s/g, ""));
                console.log("File is deleted.");
                res.status(400).send('Please enter a valid email id i.e abc@gmail.com');
            }
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

module.exports.createProfile = createProfile