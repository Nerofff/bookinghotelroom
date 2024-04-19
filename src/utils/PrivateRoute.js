import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    let user = null;

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
        user = loggedInUser;
    }

    if (!user) {
        // redirect to login if user is not authenticated

        return <Navigate to="/login" />;
    }

    // render the component if user is authenticated and has required role

    return <>{children}</>;
}

export default PrivateRoute;
