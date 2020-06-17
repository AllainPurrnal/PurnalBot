const express = require('express');
const router = express.Router();

// Report Model
const Report = require('../../models/Report');

// @route   GET api/reports
// @desc    GET All unresolved reports for mod consideration
// @access  Private only to Moderation and Admin team
router.get('/', (req, res) => {
  // Only outputs Unresolved results
  Report.find({resolved: {$eq: false}}) // resolved: {eq: false} finds and returns reports that have not been resolved
    .sort({ date: 1 }) // 1 = Ascending/False, -1 = Descending/True
    .then(reports => res.json(reports))
})

// @route   POST api/reports
// @desc    POST a user report
// @access  Public
router.post('/', (req, res) => {
  const newReport = Report({
    guildId: req.body.guildId,
    user: req.body.user,
    userId: req.body.userId,
    reason: req.body.reason,
    reportedBy: req.body.reportedBy,
    reportedById: req.body.reportedById,
  });

  newReport.save().then(report => res.json(report));
})

// @route   PUT api/reports
// @desc    PUT Edit a report's resolved value
// @access  Private only to moderation team


module.exports = router;