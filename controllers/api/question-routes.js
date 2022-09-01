const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Quiz, User, Like } = require('../../models');
const sequelize = require('../../config/connection');

