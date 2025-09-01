const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Expanded reviews (15-20 words each)
const negativeReviews = [
  "The stay was disappointing. Rooms were dirty and noisy. Host was unresponsive and facilities were outdated.",
  "I did not enjoy my time here. The property lacked cleanliness and the location was inconvenient.",
  "Amenities were insufficient, and the check-in process was chaotic. The overall experience was below expectations.",
  "The environment was unwelcoming, and the property did not match the description provided. Not recommended.",
  "Host was difficult to contact, and some facilities were broken. This stay was not pleasant."
];

const neutralReviews = [
  "The property was okay, clean but very basic. It served its purpose for a short stay.",
  "A decent place to stay, nothing remarkable. Location was acceptable, and facilities were standard.",
  "Rooms were comfortable enough, but the surroundings and service were nothing special. Average experience.",
  "Good enough for a quick visit, but did not stand out. Everything functioned correctly.",
  "An acceptable stay for travelers on a budget. Not bad, not great, just neutral."
];

const positiveReviews = [
  "Absolutely loved the place! Spacious rooms, beautiful decor, and the host was incredibly friendly and helpful.",
  "An amazing experience. The property was spotless, amenities were excellent, and the location offered breathtaking views.",
  "Our stay was wonderful. The environment was peaceful, rooms were cozy, and the host went above expectations.",
  "Highly recommend this property. Everything from cleanliness to hospitality was outstanding. We felt completely at home.",
  "A perfect getaway! Comfortable rooms, scenic surroundings, and a host who truly cared about our experience.",
  "Beautiful and serene location with modern facilities and friendly service. We will definitely come back again.",
  "The stay exceeded all expectations. Comfortable beds, excellent amenities, and a welcoming host made our trip memorable.",
  "Fantastic property with everything you need for a relaxing stay. Excellent location and very clean rooms.",
  "Wonderful attention to detail, cozy ambiance, and helpful staff. Truly enjoyed every moment of our stay."
];

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const seedReviews = async () => {
  try {
    const listings = await Listing.find({});
    const users = await User.find({});

    for (let listing of listings) {
      const usedComments = new Set();

      for (let i = 0; i < 5; i++) {
        const randomAuthor = sample(users);

        // Decide rating to favor positive
        let rating;
        if (i < 3) rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
        else if (i === 3) rating = 3; // neutral
        else rating = Math.floor(Math.random() * 2) + 1; // negative 1 or 2

        // Pick comment based on rating
        let commentArray;
        if (rating <= 2) commentArray = negativeReviews;
        else if (rating === 3) commentArray = neutralReviews;
        else commentArray = positiveReviews;

        let comment;
        do {
          comment = sample(commentArray);
        } while (usedComments.has(comment));
        usedComments.add(comment);

        const review = new Review({
          rating,
          comment,
          author: randomAuthor._id
        });

        await review.save();
        listing.reviews.push(review);
      }
      await listing.save();
    }

    console.log("Seeded reviews: more positives, some neutral, few negatives!");
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
};

seedReviews();