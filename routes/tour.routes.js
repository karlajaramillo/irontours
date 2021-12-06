const router = require("express").Router();

const Tour = require("../models/tour.model");

const User = require("../models/user.model");

const fileUploader = require("../config/cloudinary.config");

// CRUD - Create
router.get("/tours/create", async (req, res) => {
    const guides = await User.find({"role": "guide"});

    res.render("tour-views/tour-create", { guides });
});

// CRUD - Create
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

// CRUD - Read
router.get("/tours/:id", async(req, res) => {
    const { id } = req.params;
    const tour = await Tour.findById(id);

    res.render("tour-views/tour-details", tour);
});



module.exports = router;