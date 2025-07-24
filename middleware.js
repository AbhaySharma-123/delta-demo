const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
// FOR CHECK USER LOGGED IN OR NOT
module.exports. isLoggedIn  = (req,res,next)=>{
    if(!req.isAuthenticated()){
     req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create Listing");
        return res.redirect("/login");
    }
    console.log(req.user);
    next();
}
module.exports.storeReturnTo = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl || "/listings";
    }
    next();
};

module.exports.isOwner = async(req,res,next)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of this ");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
module.exports.isReviewAuthor = async(req,res,next)=>{
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not the owner of this ");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
module.exports. validateListing = (req,res,next)=>{
      let {error} = listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next();
    }
}
// FOR VALIDATION FOR SCHEMA HOPSCOTCH SE REQUEST SEND KARNE PER
module.exports. validateReview = (req,res,next)=>{
    let{error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,errMsg);
    }else{
        next();
    }
}