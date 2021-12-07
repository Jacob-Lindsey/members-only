const async = require('async');
const User = require("./models/userModel");
const Message = require("./models/messageModel");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

const users = [];
const messages = [];

function userCreate(username, password, memberLevel, firstName, lastName, cb) {
  userdetail = {
    username: username,
    password: password,
    memberLevel: memberLevel,
    firstName: firstName,
    lastName: lastName,
  };

  // Create an instance of the User model
  const user = new User(userdetail);

  // Save the new model instance, passing a callback
  user.save((err) => {
    if (err) return cb(err, null);
    console.log(`New User: ${user}`);
    users.push(user);
    return cb(null, user);
  });
}

function messageCreate(user, title, text, timestamp, cb) {
  const someMessage = {
    user: user,
    title: title,
    text: text,
    timestamp: timestamp
  };

  const message = new Message(someMessage);
  message.save((err) => {
    if (err) return cb(err, null);
    console.log(`New Message: ${message}`);
    messages.push(message);
    return cb(null, message);
  });
}

function createUsers(cb) {
  async.series([
    function(callback) {
      userCreate("TheGoldenGod", "Abcd1234", 2, "Dennis", "Reynolds", callback);
    },
    function(callback) {
      userCreate("trundallTheGrate", "Abcd12345", 1, "Charlie", "Kelly", callback);
    },
    function(callback) {
      userCreate("DEE-lightful", "Abcd123456", 1, "Dee", "Reynolds", callback);
    },
    function(callback) {
      userCreate("sheriff-of-paddys", "Abcd1234567", 2, "Ronald", "MacDonald", callback);
    },
    function(callback) {
      userCreate("DrMantisToboggan", "Abcd12345678", 1, "Frank", "Reynolds", callback);
    },
    function(callback) {
      userCreate("rickety-cricket", "Qwe123qwe123", 1, "Matthew", "Mara", callback);
    },
    function(callback) {
        userCreate("pantzzzz", "Password1234", 3, "Jacob", "Lindsey", callback);
    },
  ], cb);
}

function createMessages(cb) {
  async.series([
    function(callback) {
      messageCreate(users[0], "Welcome to the Paddy's message board.", "Okay guys, try to keep this classy. This will represent our digital presence.", Date.now(), callback);
    },
    function(callback) {
      messageCreate(users[3], "untitled", "I agree with Dennis. And I will be keeping this place more safer by maintaining a strict order regarding behavior and paying respect to our lord and savior Jesus Christ.", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[4], "ing it snail, ur mashing it again ya kn", "HEY GANG MEAND CHARLIE R DOWN BY TH BRIDGE Y IS MAC ALREDDY ACTING LIKE A ASSHOLE...", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "Frank...", "Frank, first of all, please try look at the post title before you post it. Second, stop typing in all caps. It's annoying, and it reflects poorly on us as a group. And yes, Mac, please don't be such an asshole.", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[4], ",,,,", "2EGGS .. FFdbv", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "FRANK!", "FRANK!....Please just stay off of here until you learn how to use a goddamn phone!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[1], "helloh", "Wow gys this iz rilly cool!! FrankS fone iz cuvurd n krab greece so he coodint tipe gud lol;MACK stop tauking about stoopid shit", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[5], "untitled", "hey guys! i found an old burner phone that a dog puked up after i fed him a rotten casaba melon! lol!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "Goddammit", "Omg who told Cricket about our message board?? This isn't a goddamn digital homeless shelter!!!!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[2], "Dee Reynolds here", "Hi guys! Dee Reynolds here again. For any and all inquiries please contact me directly at definitely.not.a.bird@aol.com. Headshots are available upon request. See you around!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "DEE STFU", "Jesus fucking christ Dee NOBODY cares about your hideous headshots or you incredibly outdated email address. Please keep your gangly, bird-like self off of our very classy message board you bitch!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[3], "Haha Den", "nis got you Dee! You big stupid bird!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "Mac....", "Mac, while I do agree with the bird comment, please don't just agree with everything I say on here. It is very obnoxious. And again, please look at the post title before you hit send. It is not that hard.", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[5], "untitled", "charlie can you throw some lemons out for me with the trash tonight?", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "CHARLIE DO NOT DO THAT", "Charlie goddammit do NOT throw our lemons away for homeless monsters to feed on in the night. Cricket I swear to god I will skin you alive if I see you in our trash tonight, or ever! NO LEMONS!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[3], "re: CHARLIE DO NOT DO THAT", "Charlie, you heard Dennis! Our citrus fruits are intended only for health shakes and for cleaning the toilets.", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "OMFG", "MAC SHUT THE FUCK UP! DO NOT USE OUR LEMONS ON THE GODDAMN TOILETS!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[2], "untitled", "Is that why the lemons have been looking so gross lately?...", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[1], "D", "O IM SO SARRY 4 TRYNG 2 MAKE THA TOYLET SMEL LIK A FRESH FEELD OF SITRIS FROOTS!!!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[5], "to charlie", "so the lemons will be in the usual spot right?", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[4], "dont you godaamn tell me what i can and cant d", ".", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[3], "google.com", "difference between bear and twink", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "....", "Charlie, for fuck sake stop contaminating our produce with bacteria. Frank, you clearly cannot use a phone, or the english language for that matter. Dee, I will snap your neck you disgusting bird woman. And Mac, STOP GOOGLING BEARS AND TWINKS AND HEALTH SHAKES ON OUR WIFI!!!", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[4], "Artemis here", "Hey all. I slipped Frank a cat tranquilizer, so he will be out for a day or two. I do need to swing by the bar and pick up a few lemons though, my toilet is filthy.", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "I can't handle this", "I'm done here for the day. You people are all an embarassment, and I cannot associate with you savages right now. This does not represent me.", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[3], "I can't handle this either", "I'm done here too. Me and Dennis can't be lumped in with you godless sinners! ", Date.now(), callback);
    },
    function(callback) {
        messageCreate(users[0], "NO!", "JUST FUCKING NO!.....", Date.now(), callback);
    },
    
  ], cb);
}

async.series([
  createUsers,
  createMessages,
], (err, results) => {
  if (err) { 
    console.log(`FINAL ERR: ${err}`);
  } else {
    console.log(`Success: ${results}`);
  }
  mongoose.connection.close();
});