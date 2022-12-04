//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");



const homeStartingContent = "Now when I had mastered the language of this water and had come to know every trifling feature that bordered the great river as familiarly as I knew the letters of the alphabet, I had made a valuable acquisition. But I had lost something, too. I had lost something which could never be restored to me while I lived. All the grace, the beauty, the poetry had gone out of the majestic river!";
const aboutContent = "In these passages from Chapter IX, Twain describes his changing view of the Mississippi, on which he worked as an apprentice riverboat captain.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";



const app = express();

// Mongoose Connection URL
// mongoose.connect("mongodb://0.0.0.0:27017/blogDB");
mongoose.connect("mongodb+srv://itsmeak:passwordakash@cluster0.8h2pnt9.mongodb.net/blogDB");

// PostSchema
const postSchema = {
  title: String,
  content: String
};

// Mongoose Model
const Post = mongoose.model("Post", postSchema);



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));






app.get("/", function (req, res) {
  Post.find({}, function(err, posts){
    res.render("home", {
      pageContent: homeStartingContent,
      posts: posts
    });
  });
});



app.get("/about", function(req, res){
  res.render("about", {pageContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {pageContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});




app.post("/compose", function(req, res){

  const post = new Post ({
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
  const requestedId = req.params.postId;

  Post.findOne({_id:requestedId}, function(err, post){

        res.render("post", {
          Title: post.title,
          Content: post.content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        });
  });

}); 














app.listen(3000, function () {
  console.log("Server started on port 3000");
});
