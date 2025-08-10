// seed.js
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const User = require("./models/User");
const Video = require("./models/Video");
const Comment = require("./models/Comment");

const { v4: uuidv4 } = require("uuid");

// Connect to DB
connectDB();

// Dummy Data
const seedData = async () => {
  try {
    // Clear existing data (optional)
    await User.deleteMany();
    await Video.deleteMany();
    await Comment.deleteMany();
    console.log("🗑️  Cleared existing data");

    // Create Users
    const user1 = new User({
      id: uuidv4(),
      username: "johndoe",
      displayName: "John Doe",
      avatarUrl:
        "https://res.cloudinary.com/dv5p2ctmj/image/upload/v1650000000/svap/avatars/john.jpg",
      bio: "Travel enthusiast 🌍 | Music lover 🎧",
      followers: 150,
      following: 89,
    });

    const user2 = new User({
      id: uuidv4(),
      username: "janedoe",
      displayName: "Jane Doe",
      avatarUrl:
        "https://res.cloudinary.com/dv5p2ctmj/image/upload/v1650000001/svap/avatars/jane.jpg",
      bio: "Photographer 📸 | Coffee addict ☕",
      followers: 220,
      following: 104,
    });

    await user1.save();
    await user2.save();
    console.log("✅ Created 2 users");

    // Create Videos
    const video1 = new Video({
      id: uuidv4(),
      url: "https://res.cloudinary.com/dv5p2ctmj/video/upload/v1650000010/svap/videos/dance.mp4",
      description: "Fun dance challenge I tried today! 💃",
      user: {
        id: user1.id,
        username: user1.username,
        displayName: user1.displayName,
        avatarUrl: user1.avatarUrl,
      },
      likes: 45,
      commentsCount: 0,
      shares: 12,
      createdAt: Date.now() - 86400000, // 1 day ago
    });

    const video2 = new Video({
      id: uuidv4(),
      url: "https://res.cloudinary.com/dv5p2ctmj/video/upload/v1650000011/svap/videos/cooking.mp4",
      description: "My famous pasta recipe 🍝",
      user: {
        id: user2.id,
        username: user2.username,
        displayName: user2.displayName,
        avatarUrl: user2.avatarUrl,
      },
      likes: 89,
      commentsCount: 0,
      shares: 23,
      createdAt: Date.now() - 43200000, // 12 hours ago
    });

    await video1.save();
    await video2.save();
    console.log("✅ Created 2 videos");

    // Create Comments
    const comment1 = new Comment({
      id: uuidv4(),
      videoId: video1.id,
      user: {
        id: user2.id,
        username: user2.username,
        displayName: user2.displayName,
        avatarUrl: user2.avatarUrl,
      },
      text: "Love this move! 🔥",
      timestamp: Date.now() - 7200000, // 2 hours ago
      likes: 3,
    });

    const comment2 = new Comment({
      id: uuidv4(),
      videoId: video1.id,
      user: {
        id: user1.id,
        username: user1.username,
        displayName: user1.displayName,
        avatarUrl: user1.avatarUrl,
      },
      text: "Thanks! It took me weeks to learn 😅",
      timestamp: Date.now() - 3600000, // 1 hour ago
      likes: 0,
    });

    const comment3 = new Comment({
      id: uuidv4(),
      videoId: video2.id,
      user: {
        id: user1.id,
        username: user1.username,
        displayName: user1.displayName,
        avatarUrl: user1.avatarUrl,
      },
      text: "Yum! Can you share the recipe?",
      timestamp: Date.now() - 5400000, // 1.5 hours ago
      likes: 2,
    });

    await comment1.save();
    await comment2.save();
    await comment3.save();

    // Update comments count
    video1.commentsCount = 2;
    video2.commentsCount = 1;
    await video1.save();
    await video2.save();

    console.log("✅ Created 3 comments");

    console.log("🎉 All dummy data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
