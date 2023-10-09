import axios from 'axios';
import Chance from 'chance';
import { generateFromEmail } from 'unique-username-generator';
import { wrapper as axiosCookieJarSupport } from 'axios-cookiejar-support';
import tough from 'tough-cookie';
import { faker } from '@faker-js/faker';
import { skills, collegeList, titleList, jobTypes, cityList } from './constants.js';

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
    headline: "Web Dev Intern || IT'25 IIIT BBSR",
    image: 'https://res.cloudinary.com/dhoysx4vk/image/upload/v1691127731/dpsbwwbaglgulq14dtaa.jpg',
    education: [
      {
        institutionName,
        startYear,
        endYear,
      },
    ],
    skills: [skill1, skill2, skill3],
    experience: [
      {
        title: titleList[Math.floor(Math.random() * titleList.length)],
        employmentType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
        companyName: 'ABC Tech',
        location: cityList[Math.floor(Math.random() * cityList.length)],
        startDate: '2020-01-01',
        endDate: '2022-05-31',
      },
      {
        title: titleList[Math.floor(Math.random() * titleList.length)],
        employmentType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
        companyName: 'XYZ Solutions',
        location: cityList[Math.floor(Math.random() * cityList.length)],
        startDate: '2019-06-01',
        endDate: '2019-12-31',
      },
    ],
    projects: [
      {
        title: 'Sentiment Analysis Web App',
        description: 'Developed a web application for sentiment analysis using Python and Flask.',
        demoLink: 'https://example.com/sentiment-analysis-app',
        repositoryLink: 'https://github.com/jane/sentiment-analysis-app',
      },
      {
        title: 'E-commerce Website',
        description: 'Worked on building an e-commerce website using React and Node.js.',
        demoLink: 'https://example.com/e-commerce-website',
        repositoryLink: 'https://github.com/jane/e-commerce-website',
      },
    ],
    achievements: [
      {
        title: 'Top Performer Award',
        description: 'Received the Top Performer Award for exceptional contributions to the team.',
        certificate: 'https://example.com/top-performer-certificate',
        link: '',
      },
      {
        title: 'Data Science Specialization',
        description: 'Completed an online specialization in Data Science from Coursera.',
        certificate: 'https://example.com/data-science-certificate',
        link: 'https://www.coursera.com/specializations/data-science',
      },
    ],
    courses: [
      {
        title: 'Machine Learning Fundamentals',
        certificate: 'https://example.com/machine-learning-certificate',
      },
      {
        title: 'Data Visualization Techniques',
        certificate: 'https://example.com/data-visualization-certificate',
      },
    ],
  };
  const res = await axios.post(`${process.env.SERVER_URL}/api/v1/jobapplicant/`, jobApplicant, {
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
