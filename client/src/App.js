import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Route from './components/Route';
import FindJobsPage from './pages/FindJobsPage';

function App() {
  return(
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar />
      <div>
        <Route path="/">
          <LandingPage />
        </Route>
        <Route path="/find-jobs">
          <FindJobsPage />
        </Route>
      </div>
    </div>
  )
}

export default App;
