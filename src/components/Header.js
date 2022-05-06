import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const Header = ({ token, handleToken }) => {
  const navigate = useNavigate();
  return (
    <header>
      <img
        src="https://www.vinted.fr/assets/web-logo/default/logo.svg"
        alt=""
      />
      <div>
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" />
      </div>
      <nav>
        {token === null ? (
          <div>
            <button className="header-button1">
              <Link className="header-link1" to="/signup">
                s'inscrire
              </Link>
            </button>
            <button className="header-button1">
              <Link className="header-link1" to="/login">
                se connecter
              </Link>
            </button>
          </div>
        ) : (
          <button
            className="header-button2"
            onClick={() => {
              handleToken(null);
              navigate("/");
            }}
          >
            deconnection
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
