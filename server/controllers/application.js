/* eslint no-underscore-dangle: 0 */
import Application from '../models/Application.js';
import asyncWrapper from '../middlewares/async.js';

const { log } = console;

const getAllApplications = asyncWrapper(async (req, res) => {
  // eslint-disable-next-line max-len
  // localhost:5000/api/v1/applications/?limit=2&next=590e9abd4abbf1165862d342&jobId=6429ad8b4ce2cfedb3d70dd0&status=shortlisted&minDateOfApplication=2022-02-14T00:00:00.000Z&maxDateOfApplication=2022-09-12T00:00:00.000Z&keyword=backend&sort=-DateOfApplication
  // eslint-disable-next-line max-len
  const { status, applicantId, recruiterId, jobId, minDateOfApplication, maxDateOfApplication, keyword, sort, limit } = req.query;
  const queryObject = {};

  if (status) {
    queryObject.status = status;
  }

  if (applicantId) {
    queryObject.applicantId = applicantId;
  }

  if (recruiterId) {
    queryObject.recruiterId = recruiterId;
  }

  if (jobId) {
    queryObject.jobId = jobId;
  }

  if (minDateOfApplication) {
    if (maxDateOfApplication) {
      queryObject.dateOfApplication = { $gte: minDateOfApplication, $lte: maxDateOfApplication };
    } else {
      queryObject.dateOfApplication = { $gte: minDateOfApplication };
    }
  } else if (maxDateOfApplication) {
    queryObject.dateOfApplication = { $lte: maxDateOfApplication };
  }

  let sortFix = '';
  if (sort) {
    sortFix = sort.replace(',', ' ');
    sortFix += ' -_id';
  } else {
    sortFix = '-_id';
  }

  if (req.query.next) {
    const applications = await Application.find({
      _id: { $lt: req.query.next },
      $or: [{ sop: new RegExp(keyword, 'i') }, { 'applicantId.skills': { $all: [new RegExp(keyword, 'i')] } }],
      ...queryObject,
    }).populate('recruiterId').populate('applicantId').populate('jobId')
      .sort(sortFix)
      .limit(limit);

    const next = applications.length && applications[applications.length - 1]._id;
    res.status(200).json({ applications, next });
  } else {
    const applications = await Application.find({
      $or: [{ sop: new RegExp(keyword, 'i') }, { 'applicantId.skills': { $all: [new RegExp(keyword, 'i')] } }],
      ...queryObject,
    }).populate('recruiterId').populate('applicantId').populate('jobId')
      .sort(sortFix)
      .limit(limit);

    const next = applications.length && applications[applications.length - 1]._id;
    res.status(200).json({ applications, next });
  }
});

const createApplication = asyncWrapper(async (req, res) => {
  const application = await Application.create({ applicantId: req.user.id, ...req.body });

  res.status(201).json({ application });
});

export const createApplications = asyncWrapper(async (req, res) => {
  for (let i = 0; i < req.body.length; i += 1) {
    await Application.create(req.body[i])
      .then((response) => {
        log(response);
      })
      .catch((error) => {
        log(error);
      });
  }
  res.status(200).send({ done: true });
});

const getApplication = asyncWrapper(async (req, res) => {
  const { id: applicationID } = req.params;
  const application = await Application.findOne({ _id: applicationID }).populate('recruiterId').populate('applicantId').populate('jobId');
  if (!application) {
    return res.status(404).json({ msg: `No Application with id : ${applicationID}` });
  }

  return res.status(200).json({ application });
});

const deleteApplication = asyncWrapper(async (req, res) => {
  const { id: applicationID } = req.params;
  const application = await Application.findOneAndDelete({ _id: applicationID });
  if (!application) {
    return res.status(404).json({ msg: `No application with id : ${applicationID}` });
  }
  return res.status(200).json({ application });
});

const updateApplication = asyncWrapper(async (req, res) => {
  const { id: applicationID } = req.params;

  const application = await Application.findOneAndUpdate({ _id: applicationID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!application) {
    return res.status(404).json({ msg: `No application with id : ${applicationID}` });
  }

  return res.status(200).json({ application });
});

export { getAllApplications,
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication };
