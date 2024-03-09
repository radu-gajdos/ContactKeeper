const express = require("express");
const router = express.Router();

// @route GET api/contacts
// @desc Get all users contacts
// @access Private
router.get("/", (req, res) => {
  res.send("Got all contacts");
});

// @route POST api/auth
// @desc Add new contact
// @access Public
router.post("/", (req, res) => {
  res.send("Added new contact");
});

// @route PUT api/auth/:id
// @desc Update contact
// @access Public
router.put("/:id", (req, res) => {
  res.send("Updated contact");
});

// @route DELETE api/auth/:id
// @desc Delete contact
// @access Public
router.delete("/:id", (req, res) => {
  res.send("Deleted contact");
});

module.exports = router;
