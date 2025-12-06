const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


const listingController = require("../controllers/listings.js");

router.route(
    "/")
    //index
    .get(wrapAsync(listingController.index))
    //create post
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );
    
//new Route 
router.get("/new", 
    isLoggedIn, 
    listingController.renderNewForm
);

router.route(
    "/:id")
    //show Route
    .get(wrapAsync(
        listingController.showListing)
    )
    //Update Route 
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing, 
        wrapAsync( listingController.updateListing)
    )
    //Delete Route
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );



//Edit Route
router.get(
    "/:id/edit", 
    isLoggedIn ,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;