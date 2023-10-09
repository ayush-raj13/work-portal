import axios from 'axios';
import Chance from 'chance';
import { generateFromEmail } from 'unique-username-generator';
import { wrapper as axiosCookieJarSupport } from 'axios-cookiejar-support';
import tough from 'tough-cookie';
import { faker } from '@faker-js/faker';
import { roleList, recruiterBios, atsList, fundList, jobTypes, skills, cityList, titleList } from './constants.js';

const { log } = console;

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const chance = new Chance();

async function createUser() {
  // api call to local host
  const email = chance.email();
  const username = generateFromEmail(
    email,
    4,
  );
  const user = {
    username,
    email,
    password: 'password',
  };
  const res = await axios.post(`${process.env.SERVER_URL}/api/v1/user/register`, user, {
    jar: cookieJar, // tough.CookieJar or boolean
    withCredentials: true, // If true, send cookie stored in jar
  });
  // printing id on console
  log(res.data);
}

async function changeToRecruiter() {
  const res = await axios.patch(`${process.env.SERVER_URL}/api/v1/user/type/recruiter`, {}, {
    jar: cookieJar, // tough.CookieJar or boolean
    withCredentials: true, // If true, send cookie stored in jar
  });
  log(res.data);
}

async function createRecruiter() {
  const name = faker.name.firstName();
  const roleIndex = Math.floor(Math.random() * roleList.length);
  const role1 = roleList[(roleIndex) % roleList.length];
  const role2 = roleList[(roleIndex + 1) % roleList.length];
  const bio = recruiterBios[Math.floor(Math.random() * recruiterBios.length)];
  const ats = atsList[Math.floor(Math.random() * atsList.length)];
  const fund = fundList[Math.floor(Math.random() * fundList.length)];

  const recruiter = {
    name,
    image: 'https://res.cloudinary.com/dhoysx4vk/image/upload/v1691127731/dpsbwwbaglgulq14dtaa.jpg',
    bio,
    ats,
    roles: [role1, role2],
    fund,
  };
  // api call to local host
  const res = await axios.post(`${process.env.SERVER_URL}/api/v1/recruiter`, recruiter, {
    jar: cookieJar, // tough.CookieJar or boolean
    withCredentials: true, // If true, send cookie stored in jar
  });
  // printing id on console
  log(res.data);
}

async function createJob() {
  const duration = Math.floor(Math.random() * (36 - 3 + 1) + 3);
  const salary = Math.floor(Math.random() * (500000 - 10000 + 1) + 10000);
  const skillIndex = Math.floor(Math.random() * skills.length);
  const skill1 = skills[(skillIndex) % skills.length];
  const skill2 = skills[(skillIndex + 1) % skills.length];
  const skill3 = skills[(skillIndex + 2) % skills.length];
  const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
  const title = titleList[Math.floor(Math.random() * titleList.length)];
  const dateOfPosting = faker.date.past();
  const deadline = new Date();
  const city = cityList[Math.floor(Math.random() * cityList.length)];
  const maxApplicants = Math.floor(Math.random() * (100 - 20 + 1) + 20);
  const maxPositions = Math.floor(maxApplicants / 5);
  const activeApplications = Math.floor(maxApplicants / 3);
  const acceptedCandidates = Math.floor(maxApplicants / 8);

  const job = {
    title,
    maxApplicants,
    maxPositions,
    activeApplications,
    acceptedCandidates,
    dateOfPosting,
    deadline,
    skillsets: [
      skill1,
      skill2,
      skill3,
    ],
    jobType,
    duration,
    salary,
    country: 'India',
    city,
  };
  const res = await axios.post(`${process.env.SERVER_URL}/api/v1/jobs/`, job, {
    jar: cookieJar, // tough.CookieJar or boolean
    withCredentials: true, // If true, send cookie stored in jar
  });
  // printing id on console
  log(res.data);
}

async function logout() {
  const res = await axios.get(`${process.env.SERVER_URL}/api/v1/user/logout`, {
    jar: cookieJar, // tough.CookieJar or boolean
    withCredentials: true, // If true, send cookie stored in jar
  });
  log(res.data);
}

async function sequentialCall() {
  for (const i of [1, 2, 3, 4, 5]) {
    switch (i) {
      case 1:
        await createUser();
        break;
      case 2:
        await changeToRecruiter();
        break;
      case 3:
        await createRecruiter();
        break;
      case 4:
        await createJob();
        break;
      case 5:
        await logout();
        break;
      default:
        // code block
    }
  }
  log('finish');
}

sequentialCall();
