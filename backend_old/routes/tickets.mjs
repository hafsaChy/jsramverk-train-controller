// const express = require('express');
import express from 'express';
const router = express.Router();

// const tickets = require("../models/tickets.mjs");
import tickets from "../models/tickets.mjs";

router.get('/', (req, res) => tickets.getTickets(req, res));

router.post('/', (req, res) => tickets.createTicket(req, res));

// module.exports = router;
export default router;
