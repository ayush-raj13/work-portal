/* eslint no-underscore-dangle: 0 */
import mongoose from 'mongoose';
import JobApplicant from '../models/JobApplicant.js';
import asyncWrapper from '../middlewares/async.js';
import User from '../models/User.js';

const { log } = console;

export const getAllJobApplicants = asyncWrapper(async (req, res) => {
  // eslint-disable-next-line max-len
  // localhost:5000/api/v1/jobapplicants/?limit=2&next=590e9abd4abbf1165862d342&name=ayush&institutionName=iiit&startYear=2021&endYear=2025&keyword=backend&sort=-monthsOfExperience
  // eslint-disable-next-line max-len
  const { name, applicantId, keyword, institutionName, companyName, startYear, endYear, startDate, endDate, sort } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = new RegExp(name, 'i');
  }

  if (applicantId) {
    queryObject.applicantId = mongoose.Types.ObjectId(applicantId);
  }

  if (institutionName && startYear && endYear) {
    queryObject.education = { $elemMatch: { institutionName: new RegExp(institutionName, 'i'), startYear: parseInt(startYear, 10), endYear: parseInt(endYear, 10) } };
  }

  if (institutionName && startYear && !endYear) {
    queryObject.education = { $elemMatch: { institutionName: new RegExp(institutionName, 'i'), startYear: parseInt(startYear, 10), endYear: { $lte: 4000 } } };
  }

  if (institutionName && !startYear && endYear) {
    queryObject.education = { $elemMatch: { institutionName: new RegExp(institutionName, 'i'), startYear: { $gte: 1930 }, endYear: parseInt(endYear, 10) } };
  }

  if (institutionName && !startYear && !endYear) {
    queryObject.education = { $elemMatch: { institutionName: new RegExp(institutionName, 'i'), startYear: { $gte: 1930 }, endYear: { $lte: 4000 } } };
  }

  if (!institutionName && startYear && endYear) {
    // eslint-disable-next-line max-len
    queryObject.education = { $elemMatch: { startYear: parseInt(startYear, 10), endYear: parseInt(endYear, 10) } };
  }

  if (!institutionName && startYear && !endYear) {
    // eslint-disable-next-line max-len
    queryObject.education = { $elemMatch: { startYear: parseInt(startYear, 10), endYear: { $lte: 4000 } } };
  }

  if (!institutionName && !startYear && endYear) {
    // eslint-disable-next-line max-len
    queryObject.education = { $elemMatch: { startYear: { $gte: 1930 }, endYear: parseInt(endYear, 10) } };
  }

  if (!institutionName && !startYear && !endYear) {
    queryObject.education = { $elemMatch: { startYear: { $gte: 1930 }, endYear: { $lte: 4000 } } };
  }

  if (companyName && startDate && endDate) {
    queryObject.experience = { $elemMatch: { companyName: new RegExp(companyName, 'i'), startDate: { $gte: new Date(startDate, 0, 1), $lte: new Date(startDate, 11, 31, 23, 59, 59, 999) }, endDate: { $gte: new Date(endDate, 0, 1), $lte: new Date(endDate, 11, 31, 23, 59, 59, 999) } } };
  }

  if (companyName && startDate && !endDate) {
    queryObject.experience = { $elemMatch: { companyName: new RegExp(companyName, 'i'), startDate: { $gte: new Date(startDate, 0, 1), $lte: new Date(startDate, 11, 31, 23, 59, 59, 999) }, endDate: { $lte: new Date('4000', 11, 31, 23, 59, 59, 999) } } };
  }

  if (companyName && !startDate && endDate) {
    queryObject.experience = { $elemMatch: { companyName: new RegExp(companyName, 'i'), startDate: { $gte: new Date('1500', 0, 1) }, endDate: { $gte: new Date(endDate, 0, 1), $lte: new Date(endDate, 11, 31, 23, 59, 59, 999) } } };
  }

  if (companyName && !startDate && !endDate) {
    queryObject.experience = { $elemMatch: { companyName: new RegExp(companyName, 'i'), startDate: { $gte: new Date('1500', 0, 1) }, endDate: { $lte: new Date('4000', 11, 31, 23, 59, 59, 999) } } };
  }

  if (!companyName && startDate && endDate) {
    // eslint-disable-next-line max-len
    queryObject.experience = { $elemMatch: { startDate: { $gte: new Date(startDate, 0, 1), $lte: new Date(startDate, 11, 31, 23, 59, 59, 999) }, endDate: { $gte: new Date(endDate, 0, 1), $lte: new Date(endDate, 11, 31, 23, 59, 59, 999) } } };
  }

  if (!companyName && startDate && !endDate) {
    queryObject.experience = { $elemMatch: { startDate: { $gte: new Date(startDate, 0, 1), $lte: new Date(startDate, 11, 31, 23, 59, 59, 999) }, endDate: { $lte: new Date('4000', 11, 31, 23, 59, 59, 999) } } };
  }

  if (!companyName && !startDate && endDate) {
    queryObject.experience = { $elemMatch: { startDate: { $gte: new Date('1500', 0, 1) }, endDate: { $gte: new Date(endDate, 0, 1), $lte: new Date(endDate, 11, 31, 23, 59, 59, 999) } } };
  }

  if (!companyName && !startDate && !endDate) {
    queryObject.experience = { $elemMatch: { startDate: { $gte: new Date('1500', 0, 1) }, endDate: { $lte: new Date('4000', 11, 31, 23, 59, 59, 999) } } };
  }

  let sortFix = '';
  if (sort) {
    sortFix = { monthsOfExperience: sort.charAt(0) === '-' ? -1 : 1, _id: -1 };
  } else {
    sortFix = { _id: -1 };
  }

  let page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const pipeline = [
    {
      $addFields: {
        monthsOfExperience: {
          $reduce: {
            input: '$experience',
            initialValue: 0,
            in: {
              $add: [
                '$$value',
                {
                  $let: {
                    vars: {
                      startDate: { $toDate: '$$this.startDate' },
                      endDate: {
                        $cond: {
                          if: '$$this.endDate',
                          then: { $toDate: '$$this.endDate' },
                          else: new Date(),
                        },
                      },
                    },
                    in: {
                      $let: {
                        vars: {
                          diffInYears: { $subtract: [{ $year: '$$endDate' }, { $year: '$$startDate' }] },
                          diffInMonths: { $subtract: [{ $month: '$$endDate' }, { $month: '$$startDate' }] },
                        },
                        in: {
                          $add: [
                            { $multiply: ['$$diffInYears', 12] },
                            '$$diffInMonths',
                          ],
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $match: {
        $or: [
          { skills: { $in: [new RegExp(keyword, 'i')] } },
          { 'experience.title': { $regex: new RegExp(keyword, 'i') } },
          {
            $or: [
              { 'projects.title': { $regex: new RegExp(keyword, 'i') } },
              { 'projects.description': { $regex: new RegExp(keyword, 'i') } },
            ],
          },
          {
            $or: [
              { 'achievements.title': { $regex: new RegExp(keyword, 'i') } },
              { 'achievements.description': { $regex: new RegExp(keyword, 'i') } },
            ],
          },
        ],
      },
    },
    {
      $sort: sortFix, // Assuming sortFix is defined elsewhere
    },
    {
      $skip: skip, // Assuming skip is defined elsewhere
    },
    {
      $limit: limit, // Assuming limit is defined elsewhere
    },
    {
      $lookup: {
        from: 'users', // Assuming the referenced collection name is 'users'
        localField: 'applicantId',
        foreignField: '_id',
        as: 'applicantId',
      },
    },
  ];

  if (queryObject.name !== undefined) {
    pipeline.splice(2, 0, { // Insert at index 2 (right after the initial $match stage)
      $match: {
        name: {
          $regex: queryObject.name,
        },
      },
    });
  }

  if (queryObject.applicantId !== undefined) {
    pipeline.splice(2, 0, { // Insert at index 2 (right after the initial $match stage)
      $match: {
        applicantId: queryObject.applicantId,
      },
    });
  }

  if (queryObject.education !== undefined) {
    pipeline.splice(2, 0, { // Insert at index 2 (right after the initial $match stage)
      $match: {
        education: queryObject.education,
      },
    });
  }

  if (queryObject.experience !== undefined) {
    pipeline.splice(2, 0, { // Insert at index 2 (right after the initial $match stage)
      $match: {
        experience: queryObject.experience,
      },
    });
  }

  const jobApplicants = await JobApplicant.aggregate(pipeline);

  if (jobApplicants.length) {
    page += 1;
  } else {
    page = -1;
  }
  res.status(200).json({ jobApplicants, page });
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
  const jobApplicant = await JobApplicant.findOne({ _id: jobApplicantID });

  if (!jobApplicant) {
    return res.status(404).json({ error: 'JobApplicant not found' });
  }
  if (jobApplicant.applicantId.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const updatedJobApplicant = await JobApplicant.findOneAndUpdate(
    { _id: jobApplicantID },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedJobApplicant) {
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
