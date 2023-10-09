import useNavigation from "../hooks/use-navigation";
import axios from "axios";

function Route({ path, children, requireAuth, requireApplicantAuth, requireRecruiterAuth, prevPath }) {
    const { currentPath, setCurrentPath } = useNavigation();
    console.log(path);
    const checkAuth = async () => {
        const isAuthenticated = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/is-authenticated`, { withCredentials: true });
        if (!isAuthenticated.data) {
            window.history.replaceState({ prevUrl: window.location.href }, "", "/login");
            setCurrentPath(window.location.pathname);
        }
    }

    const checkApplicantAuth = async () => {
        const isAuthenticated = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/jobapplicant/is-authenticated`, { withCredentials: true });
        if (!isAuthenticated.data) {
            window.history.replaceState({ prevUrl: window.location.href }, "", "/login");
            setCurrentPath(window.location.pathname);
        }
    }

    const checkRecruiterAuth = async () => {
        const isAuthenticated = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/recruiter/is-authenticated`, { withCredentials: true });
        if (!isAuthenticated.data) {
            window.history.replaceState({ prevUrl: window.location.href }, "", "/login");
            setCurrentPath(window.location.pathname);
        }
    }

    if ((path === currentPath || (path instanceof RegExp && path.test(currentPath))) && !!requireAuth) {
        checkAuth();
    } if ((path === currentPath || (path instanceof RegExp && path.test(currentPath))) && !!requireApplicantAuth) {
        checkApplicantAuth();
    } if ((path === currentPath || (path instanceof RegExp && path.test(currentPath))) && !!requireRecruiterAuth) {
        checkRecruiterAuth();
    } if (path === currentPath || (path instanceof RegExp && path.test(currentPath))) {
        if (!!prevPath && window.history.state.prevUrl === `${process.env.REACT_APP_REACT_URL}` + prevPath) {
            return children;
        } else if (!prevPath) {
            return children;
        }
    }

    return null;
}

export default Route;