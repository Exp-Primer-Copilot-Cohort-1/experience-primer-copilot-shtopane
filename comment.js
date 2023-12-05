// Create web server with express
// Create router object with express
const express = require('express');
const router = express.Router();

// Create comment model object
const Comment = require('../models/comment');
const User = require('../models/user');

// Create comment routes
// Create comment index route
router.get('/', (req, res) => {
    Comment.find({}, (err, allComments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/index', { comments: allComments });
        }
    });
});

// Create comment new route
router.get('/new', isLoggedIn, (req, res) => {
    res.render('comments/new');
});

// Create comment create route
router.post('/', isLoggedIn, (req, res) => {
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newComment = {
        text: req.body.text,
    };
    Comment.create(newComment, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            comment.author = author;
            comment.save();
            res.redirect('/comments');
        }
    });
});
