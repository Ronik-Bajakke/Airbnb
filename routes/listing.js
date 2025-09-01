const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");

const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing)
);


router.get("/category/:category", wrapAsync(async (req, res) => {
  const { category } = req.params;
  const allListings = await Listing.find({ category });
  res.render("listings/index.ejs", { allListings });
}));
router.get("/search", wrapAsync(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.redirect("/listings");
  }

  const allListings = await Listing.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } }
    ]
  });

  res.render("listings/index.ejs", { allListings });
}));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//Edit route
router.get("/:id/edit",isOwner,isLoggedIn,wrapAsync(listingController.renderEditForm));



module.exports=router;