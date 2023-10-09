import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Route from './components/Route';
import FindJobsPage from './pages/FindJobsPage';
import AuthPage from './pages/AuthPage';
import HireEmployeesPage from './pages/HireEmployeesPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return(
    <div className="flex flex-col justify-center items-center min-h-screen">
        <Route path="/">
          <Navbar />
          <div>
            <LandingPage />
          </div>
        </Route>
        <Route path="/find-jobs" requireAuth>
          <Navbar />
          <div>
            <FindJobsPage />
          </div>
        </Route>
        <Route path="/login">
          <div>
            <AuthPage />
          </div>
        </Route>
        <Route path="/register">
          <div>
            <AuthPage />
          </div>
        </Route>
        <Route path="/user-type-selection" prevPath="/register" requireApplicantAuth>
          <div>
            <AuthPage />
          </div>
        </Route>
        <Route path="/applicant-form" prevPath="/user-type-selection" requireApplicantAuth>
          <div>
            <AuthPage />
          </div>
        </Route>
        <Route path="/recruiter-form" prevPath="/user-type-selection" requireRecruiterAuth>
          <div>
            <AuthPage />
          </div>
        </Route>
        <Route path="/hire-employees" requireAuth>
          <Navbar />
          <div>
            <HireEmployeesPage />
          </div>
        </Route>
        <Route path="/profile" requireAuth>
          <div>
            <ProfilePage />
          </div>
        </Route>
        <Route path={/^\/find-jobs\/[^/]+$/} requireAuth>
          <div>
            <h1>Hello</h1>
          </div>
        </Route>
    </div>
  )
}

export default App;
