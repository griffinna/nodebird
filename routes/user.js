const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { addFollowing } = require('../controllers/user');
const { sequelize } = require('../models');
const User = require('../models/user');

const router = express.Router();

router.route('/:id/follow')
    .post(isLoggedIn, addFollowing)
    .delete(isLoggedIn, async (req, res, next) => {
        try {
            const user = await User.findOne({ where: { id: req.user.id } });
            if(user) {
                const [result, metadata] = await sequelize.query('DELETE FROM Follow WHERE followingId = ' + req.params.id + ' AND followerId = ' + req.user.id);
                res.send('success');
            } else {
                res.status(404).send('No User');
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    })

module.exports = router;