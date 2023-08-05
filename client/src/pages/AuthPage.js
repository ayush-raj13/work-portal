import Login from "../components/Login";
import Register from "../components/Register";
import Route from "../components/Route";
import UserTypeSelection from "../components/UserTypeSelection";
import ApplicantForm from "../components/ApplicantForm";
import RecruiterForm from "../components/RecruiterForm";

function AuthPage() {
  return (
    <div className="min-w-screen min-h-screen w-screen bg-[#3A1078] flex items-center justify-center px-5 py-5">
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/user-type-selection">
        <UserTypeSelection />
      </Route>
      <Route path="/applicant-form">
        <ApplicantForm />
      </Route>
      <Route path="/recruiter-form">
        <RecruiterForm />
      </Route>
    </div>
  );
}

export default AuthPage;