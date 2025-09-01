const Listing=require("../models/listing.js");

const axios = require("axios");
const mapToken = process.env.MAP_TOKEN;





module.exports.index=async (req,res)=>{
     const { category } = req.query;

    let allListings;
    if (category) {
        allListings = await Listing.find({ category: category });
    } else {
        allListings = await Listing.find({});
    }
    res.render("listings/index.ejs",{allListings,category});
}
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}

// module.exports.createListing=async (req,res,next)=>{
    
//     const url = `https://api.maptiler.com/geocoding/${encodeURIComponent("New Delhi, India")}.json?key=${process.env.mapToken}`;
// const response = await axios.get(url);

// if (response.data && response.data.features && response.data.features.length > 0) {
//     const coords = response.data.features[0].geometry.coordinates; // [lng, lat]
//     console.log("Coordinates:", coords);
//     res.send(`Coordinates: ${coords}`);
// } else {
//     console.log("No results found");
//     res.send("No results found");
// }


//     let url=req.file.path;
//     let filename=req.file.filename;
//     const newListing=new Listing(req.body.listing);
//     newListing.owner=req.user._id;
//     newListing.image={url,filename};
//     await newListing.save();
//     req.flash("success","New Listing Created!");
//     res.redirect("/listings"); 
// }

module.exports.createListing = async (req, res, next) => {
  try {
    const location = req.body.listing.location;
    const geoUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${mapToken}`;
    const response = await axios.get(geoUrl);

    let coords = null;
    if (response.data && response.data.features && response.data.features.length > 0) {
      coords = response.data.features[0].geometry.coordinates; // [lng, lat]
      console.log("Coordinates:", coords);
    } else {
      console.log("No results found for:", location);
    }

    // Image upload
    let imgUrl = req.file?.path || "";
    let filename = req.file?.filename || "";
    const newListing = new Listing({
      ...req.body.listing,
      owner: req.user._id,
      image: { url: imgUrl, filename },
      geometry: coords
        ? {
            type: "Point",
            coordinates: coords
          }
        : undefined 
    });

    await newListing.save();
    console.log("New Listing Saved:", newListing);

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (err) {
    console.error("Error creating listing:", err.message);
    res.status(500).send("Something went wrong");
  }
};

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    let orginalImageUrl=listing.image.url;
    orginalImageUrl=orginalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,orginalImageUrl});
}

// module.exports.updateListing=async (req,res)=>{
//     let {id}=req.params;
//     let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     if(typeof req.file!=="undefined"){
//         let url=req.file.path;
//         let filename=req.file.filename;
//         listing.image={url,filename};
//         await listing.save();
//     }
//     req.flash("success","Listing Updated!");
//     res.redirect(`/listings/${id}`);
// }
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if (req.body.listing.location) {
        try {
            const geoUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(req.body.listing.location)}.json?key=${mapToken}`;
            const response = await axios.get(geoUrl);

            if (response.data.features && response.data.features.length > 0) {
                listing.geometry = response.data.features[0].geometry; 
            }
        } catch (err) {
            console.error("MapTiler Geocoding failed:", err.message);
        }
    }
    if (req.file) {
        listing.image = { url: req.file.path, filename: req.file.filename };
    }
    await listing.save();

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${listing._id}`);
};



module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}