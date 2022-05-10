import "./header.scss";
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
    <center>
      <header>
        <Link to="/">
          <img
            src="https://www.vinted.fr/assets/web-logo/default/logo.svg"
            alt=""
          />
        </Link>
        <div className="searchbox">
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
              <button className="header-button2">
                <Link className="header-link3" to="/publish">
                  vends tes articles
                </Link>
              </button>
            </div>
          ) : (
            <>
              <button className="header-button2">
                <Link className="header-link3" to="/publish">
                  vends tes articles
                </Link>
              </button>
              <button
                className="header-button2"
                onClick={() => {
                  handleToken(null);
                  navigate("/");
                }}
              >
                deconnection
              </button>
            </>
          )}
        </nav>
      </header>
    </center>
  );
};

export default Header;
