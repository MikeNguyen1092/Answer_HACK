import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-dark lighten-2 text-light mb-2 py-3">
      <div className="container d-flex justify-content-between align-items-center my-3">
        <div className="text-left">
          {Auth.loggedIn() ? (
            <div className="d-flex">
              <Link className="btn btn-sm btn-light m-2" to="/me">
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button className="btn btn-sm btn-light m-2" onClick={logout}>
                Logout
              </button>
              <Link className="btn btn-sm btn-light m-2" to="/gamepage">
                Start🍺
              </Link>
            </div>
          ) : (
            <div className="d-flex">
              <Link className="btn btn-sm btn-light m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-sm btn-light m-2" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
        <div className="text-center">
          <Link className="text-light" to="/" style={{ textDecoration: 'none' }}>
            <h1 className="m-1">Tap Room Trivia</h1>
            <p className="m-0">For every round you're not first, you're last!</p>
          </Link>
        </div>
        <div className="text-right">
          <Link className="btn btn-lg btn-light m-3" to="/highscore">
            Highscores
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;