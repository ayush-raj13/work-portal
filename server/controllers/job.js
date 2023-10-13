/* eslint no-underscore-dangle: 0 */
import Job from '../models/Job.js';
import asyncWrapper from '../middlewares/async.js';
import Recruiter from '../models/Recruiter.js';

const { log } = console;

const getAllJobs = asyncWrapper(async (req, res) => {
  // eslint-disable-next-line max-len
  // localhost:5000/api/v1/jobs/?limit=2&next=590e9abd4abbf1165862d342&jobType=Full Time&minSalary=10000&maxSalary=50000&minDuration=3&maxDuration=6&location=Pune&keyword=backend&sort=-salary,duration
  // eslint-disable-next-line max-len
  const { jobType, minSalary, maxSalary, minDuration, maxDuration, location, keyword, sort, minExperience, applicantSkills } = req.query;
  const queryObject = {};

  if (jobType) {
    queryObject.jobType = jobType;
  }

  if (minSalary) {
    if (maxSalary) {
      queryObject.salary = { $gte: minSalary, $lte: maxSalary };
    } else {
      queryObject.salary = { $gte: minSalary };
    }
  } else if (maxSalary) {
    queryObject.salary = { $lte: maxSalary };
  }

  if (minDuration) {
    if (maxDuration) {
      queryObject.duration = { $gte: minDuration, $lte: maxDuration };
    } else {
      queryObject.duration = { $gte: minDuration };
    }
  } else if (maxDuration) {
    queryObject.duration = { $lte: maxDuration };
  }

  if (minExperience) {
    queryObject.experience = { $gte: minExperience };
  }

  if (applicantSkills) {
    const applicantSkillsArray = applicantSkills.split(',');
    queryObject.skillsets = {
      $in: applicantSkillsArray,
    };
  }

  let sortFix = '';
  if (sort) {
    sortFix = sort.replace(',', ' ');
    sortFix += ' -_id';
  } else {
    sortFix = '-_id';
  }

  let page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const jobs = await Job.find({
    $and: [{ $or: [{ city: new RegExp(location, 'i') }, { country: new RegExp(location, 'i') }] }, { $or: [{ title: new RegExp(keyword, 'i') }, { skillsets: { $all: [new RegExp(keyword, 'i')] } }] }],
    ...queryObject,
  }).populate('recruiterId')
    .sort(sortFix)
    .skip(skip)
    .limit(limit);

  if (jobs.length) {
    page += 1;
  } else {
    page = -1;
  }
  res.status(200).json({ jobs, page });
});

const createJob = asyncWrapper(async (req, res) => {
  const { _id } = await Recruiter.findOne({ recruiterId: req.user.id });
  const job = await Job.create({ recruiterId: _id, ...req.body });

  res.status(201).json({ job });
});

export const createJobs = asyncWrapper(async (req, res) => {
  for (let i = 0; i < req.body.length; i += 1) {
    await Job.create(req.body[i])
      .then((response) => {
        log(response);
      })
      .catch((error) => {
        log(error);
      });
  }
  res.status(200).send({ done: true });
});

const getJob = asyncWrapper(async (req, res) => {
  const { id: jobID } = req.params;
  const job = await Job.findOne({ _id: jobID }).populate('recruiterId');
  if (!job) {
    return res.status(404).json({ msg: `No job with id : ${jobID}` });
  }

  return res.status(200).json({ job });
});

const deleteJob = asyncWrapper(async (req, res) => {
  const { id: jobID } = req.params;
  const job = await Job.findOneAndDelete({ _id: jobID });
  if (!job) {
    return res.status(404).json({ msg: `No job with id : ${jobID}` });
  }
  return res.status(200).json({ job });
});

const updateJob = asyncWrapper(async (req, res) => {
  const { id: jobID } = req.params;

  const job = await Job.findOneAndUpdate({ _id: jobID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!job) {
    return res.status(404).json({ msg: `No job with id : ${jobID}` });
  }

  return res.status(200).json({ job });
});

export { getAllJobs, createJob, getJob, updateJob, deleteJob };
