//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const homeStartingContent = "Dive into the World of Blockchain with Our Expert Insights";
const aboutContent = "Welcome to our blockchain blog! We are a team of blockchain enthusiasts who are passionate about sharing the latest news, insights, and analysis on the world of blockchain and cryptocurrency. Our goal is to provide a platform for informed and engaging discussions on the most exciting developments in this rapidly evolving industry. Our team consists of experts in the field, with a diverse range of backgrounds and expertise. We are dedicated to providing accurate, up-to-date information and fostering a community of like-minded individuals who are interested in learning more about blockchain technology. Thank you for visiting our site. We hope you find our content informative and engaging, and we welcome your feedback and comments. If you have any questions or suggestions for future topics, please don't hesitate to contact us.";
const contactContent = "Thank you for your interest in contacting us. If you have any questions, comments, or suggestions for future topics, we would love to hear from you."+
"You can reach us by email at info@blockchainblog.com. We will do our best to respond to your inquiry as soon as possible."+
"You can also connect with us on social media. Follow us on Twitter @blockchainblog, or like us on Facebook at facebook.com/blockchainblog. We regularly post updates, news, and analysis on these platforms. Follow us on Instagram @blockchainblog for a behind-the-scenes look at our team and the world of blockchain."
+"Our location: We are based in San Francisco, California, at the heart of the tech industry."+
"Thank you for your support and we look forward to hearing from you.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect(`mongodb+srv://Akshay_Jagiasi:${process.env.PASSWORD}@cluster0.4vefhdb.mongodb.net/blogDB`, {useNewUrlParser: true});
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
