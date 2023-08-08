import useNavigation from "../hooks/use-navigation";
import axios from "axios";

function Route({ path, children, requireAuth, requireApplicantAuth, requireRecruiterAuth, prevPath }) {
    const { currentPath, setCurrentPath } = useNavigation();
    const checkAuth = async () => {
        const isAuthenticated = await axios.get(`http://172.21.3.26:5000/api/v1/user/is-authenticated`, { withCredentials: true });
        if (!isAuthenticated.data) {
            window.history.replaceState({ prevUrl: window.location.href }, "", "/login");
            setCurrentPath(window.location.pathname);
        }
    }

    const checkApplicantAuth = async () => {
        const isAuthenticated = await axios.get(`http://172.21.3.26:5000/api/v1/jobapplicant/is-authenticated`, { withCredentials: true });
        if (!isAuthenticated.data) {
            window.history.replaceState({ prevUrl: window.location.href }, "", "/login");
            setCurrentPath(window.location.pathname);
        }
    }

    const checkRecruiterAuth = async () => {
        const isAuthenticated = await axios.get(`http://172.21.3.26:5000/api/v1/recruiter/is-authenticated`, { withCredentials: true });
        if (!isAuthenticated.data) {
            window.history.replaceState({ prevUrl: window.location.href }, "", "/login");
            setCurrentPath(window.location.pathname);
        }
    }

    if (path === currentPath && !!requireAuth) {
        checkAuth();
    } if (path === currentPath && !!requireApplicantAuth) {
        checkApplicantAuth();
    } if (path === currentPath && !!requireRecruiterAuth) {
        checkRecruiterAuth();
    } if (path === currentPath) {
        if (!!prevPath && window.history.state.prevUrl === "http://localhost:3000" + prevPath) {
            return children;
        } else if (!prevPath) {
            return children;
        }
    }

    return null;
}

export default Route;