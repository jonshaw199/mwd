const mongoose = require("mongoose");

require("../models/Image");
require("../models/Project");
require("../models/User");
const Preferences = require("../models/Preferences");

var mongoURI = process.env.EXPRESS_SERVER_MONGO_URI;

class MongoUtils {
  constructor() {
    this.connection = null;
    this.connect();
    this.getPreferences();
  }

  async connect() {
    this.connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  }

  async getPreferences() {
    const result = await Preferences.findOne();
    global.preferences = result;
  }
}

module.exports = new MongoUtils();
