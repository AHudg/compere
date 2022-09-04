<<<<<<< HEAD
const router = require('express').Router();
const { User, Quiz, Like, Question } = require('../../models');
const withAuth = require('../../utils/auth');
=======
const router = require("express").Router();
const { User, Quiz, Vote, Score } = require("../../models");
>>>>>>> f2bc9067662b1e060aa72243cbc9466ed25f7b07

// gets all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Quiz,
        attributes: ["id", "title", "img_url", "description"], // possibly include questions
      },
      {
        model: Quiz,
        attributes: ["title"],
        through: Vote,
        as: "liked_quizes",
      },
      {
        model: Score,
        attributes: ["points"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

<<<<<<< HEAD
router.post('/', withAuth, (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@example.com, password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                require.session.loggedIn = true;
=======
router.post("/", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@example.com, password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
>>>>>>> f2bc9067662b1e060aa72243cbc9466ed25f7b07

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

<<<<<<< HEAD
router.post('/login', withAuth, (req, res) => {
    // expects { email: 'lernatino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with this email address!' });
                return;
            }

            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        });
});

router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        require.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
=======
router.post("/login", (req, res) => {
  // expects { email: 'lernatino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "No user found with this email address!" });
      return;
>>>>>>> f2bc9067662b1e060aa72243cbc9466ed25f7b07
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

<<<<<<< HEAD
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
=======
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    require.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
>>>>>>> f2bc9067662b1e060aa72243cbc9466ed25f7b07
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

<<<<<<< HEAD
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
=======
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
>>>>>>> f2bc9067662b1e060aa72243cbc9466ed25f7b07
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
