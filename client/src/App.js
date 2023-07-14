import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Route from './components/Route';

function App() {
  return(
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Navbar />
      <div>
        <Route path="/">
          <LandingPage />
        </Route>
      </div>
    </div>
  )
}

export default App;
