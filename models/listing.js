const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:
            "https://unsplash.com/photos/a-group-of-palm-trees-sitting-in-the-middle-of-a-body-of-water-ur0JU-NBblk",
        set:(v)=>
            v === "" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Funsplash-app&psig=AOvVaw30EC7BeOwpY1qXA4WWQ02t&ust=1761209044913000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOirlNC0t5ADFQAAAAAdAAAAABAE"
            : v ,
    },
    price:Number,
    location:String,
    country:String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({reviews : {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;