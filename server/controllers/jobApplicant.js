/* eslint no-underscore-dangle: 0 */
import JobApplicant from '../models/JobApplicant.js';
import asyncWrapper from '../middlewares/async.js';
import User from '../models/User.js';

const { log } = console;

export const getAllJobApplicants = asyncWrapper(async (req, res) => {
  // eslint-disable-next-line max-len
  // localhost:5000/api/v1/jobapplicants/?limit=2&next=590e9abd4abbf1165862d342&name=ayush&institutionName=iiit&startYear=2021&endYear=2025&keyword=backend&sort=-startYear
  // eslint-disable-next-line max-len
  const { name, institutionName, startYear, endYear, sort, limit } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = new RegExp(name, 'i');
  }

  if (institutionName && startYear && endYear) {
    queryObject.education = { $elemMatch: { institutionName: new RegExp(institutionName, 'i'), startYear, endYear } };
  }

  if (institutionName && startYear && !endYear) {
    queryObject.education = { $elemMatch: { institutionName: new RegExp(institutionName, 'i'), startYear, endYear: { $lte: 4000 } } };
  }

  if (institutionName && !startYear && !endYear) {
    queryObject.education = { $elemMatch: { institutionName: new RegExp(institutionName, 'i'), startYear: { $gte: 1500 }, endYear: { $lte: 4000 } } };
  }

  let sortFix = '';
  if (sort) {
    sortFix = sort.replace(',', ' ');
    sortFix += ' -_id';
  } else {
    sortFix = '-_id';
  }

  if (req.query.next) {
    const jobApplicants = await JobApplicant.find({
      _id: { $lt: req.query.next },
      ...queryObject,
    }).populate('applicantId')
      .sort(sortFix)
      .limit(limit);

    const next = jobApplicants.length && jobApplicants[jobApplicants.length - 1]._id;
    res.status(200).json({ jobApplicants, next });
  } else {
    const jobApplicants = await JobApplicant.find({
      ...queryObject,
    }).populate('applicantId')
      .sort(sortFix)
      .limit(limit);

    const next = jobApplicants.length && jobApplicants[jobApplicants.length - 1]._id;
    res.status(200).json({ jobApplicants, next });
  }
});

export const createJobApplicant = asyncWrapper(async (req, res) => {
  const jobApplicant = await JobApplicant.create({ applicantId: req.user.id,
    ...req.body });

  res.status(201).json({ jobApplicant });
});

export const createJobApplicants = asyncWrapper(async (req, res) => {
  for (let i = 0; i < req.body.length; i += 1) {
    await JobApplicant.create(req.body[i])
      .then((response) => {
        log(response);
      })
      .catch((error) => {
        log(error);
      });
  }
  res.status(200).send({ done: true });
});

export const getJobApplicant = asyncWrapper(async (req, res) => {
  const { id: jobApplicantID } = req.params;
  const jobApplicant = await JobApplicant.findOne({ _id: jobApplicantID }).populate('applicantId');
  if (!jobApplicant) {
    return res.status(404).json({ msg: `No jobApplicant with id : ${jobApplicantID}` });
  }

  return res.status(200).json({ jobApplicant });
});

export const updateJobApplicant = asyncWrapper(async (req, res) => {
  const { id: jobApplicantID } = req.params;

  const jobApplicant = await JobApplicant.findOneAndUpdate({ _id: jobApplicantID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!jobApplicant) {
    return res.status(404).json({ msg: `No jobApplicant with id : ${jobApplicantID}` });
  }

  return res.status(200).json({ jobApplicant });
});

export const isAuthenticated = async (req, res) => {
  if (req.isAuthenticated()) {
    const reqUsername = req.user.username;
    User.findOne({ username: reqUsername }, (err, docs) => {
      if (!err) {
        if (docs && docs.userType === 'applicant') {
          res.send(true);
        } else {
          res.send(false);
        }
      }
    });
  } else {
    res.send(false);
  }
};
