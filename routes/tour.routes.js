const router = require("express").Router();

const Tour = require("../models/tour.model");

const fileUploader = require("../config/cloudinary.config");

router.get("/tours/create", async (req, res) => {
    const guides = await User.find({"role": "guide"});

    res.render("tour-views/tour-create", { guides });
});


router.post("/tours/create", fileUploader.single("tour-cover-image"), async (req, res) => {
    try {
        const { name, description, tourGuide} = req.body;
    console.log(req.body);

    const newTour = await Tour.create({ name, description, tourGuide, image: req.file.path });
    console.log(newTour);
    res.redirect('/')
    } catch(error) {
        console.error(error);
    }


})