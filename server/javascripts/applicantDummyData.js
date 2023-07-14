import axios from 'axios';
import Chance from 'chance';
import { generateFromEmail } from 'unique-username-generator';
import { wrapper as axiosCookieJarSupport } from 'axios-cookiejar-support';
import tough from 'tough-cookie';
import { faker } from '@faker-js/faker';
import { skills, collegeList } from './constants.js';

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
  const res = await axios.post('http://localhost:5000/api/v1/user/register', user, {
    jar: cookieJar, // tough.CookieJar or boolean
    withCredentials: true, // If true, send cookie stored in jar
  });
  // printing id on console
  log(res.data);
}

async function createJobApplicant() {
  const name = faker.name.firstName();
  const institutionName = collegeList[Math.floor(Math.random() * collegeList.length)];
  const skillIndex = Math.floor(Math.random() * skills.length);
  const skill1 = skills[(skillIndex) % skills.length];
  const skill2 = skills[(skillIndex + 1) % skills.length];
  const skill3 = skills[(skillIndex + 2) % skills.length];
  const startYear = Math.floor(Math.random() * (2019 - 2000 + 1) + 2000);
  const endYear = startYear + 4;
  // api call to local host
  const jobApplicant = {
    name,
    education: [
      {
        institutionName,
        startYear,
        endYear,
      },
    ],
    skills: [skill1, skill2, skill3],
  };
  const res = await axios.post('http://localhost:5000/api/v1/jobapplicant/', jobApplicant, {
    jar: cookieJar, // tough.CookieJar or boolean
    withCredentials: true, // If true, send cookie stored in jar
  });
  // printing id on console
  log(res.data);
}

async function logout() {
  const res = await axios.get('http://localhost:5000/api/v1/user/logout', {
    jar: cookieJar, // tough.CookieJar or boolean
    withCredentials: true, // If true, send cookie stored in jar
  });
  log(res.data);
}

async function sequentialCall() {
  for (const i of [1, 2, 3]) {
    switch (i) {
      case 1:
        await createUser();
        break;
      case 2:
        await createJobApplicant();
        break;
      case 3:
        await logout();
        break;
      default:
        // code block
    }
  }
  log('finish');
}

sequentialCall();
