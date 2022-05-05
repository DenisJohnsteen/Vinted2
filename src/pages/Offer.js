import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading === true ? (
    <div>En cours de chargement...</div>
  ) : (
    <>
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
          <button className="header-button1">
            <Link className="header-link1" to="/">
              s'inscrire
            </Link>
          </button>
          <button className="header-button1">
            <Link className="header-link1" to="/">
              se connecter
            </Link>
          </button>
          <button className="header-button2">
            <Link className="header-link3" to="/">
              vends tes articles
            </Link>
          </button>
        </nav>
      </header>
      <main>
        <div>
          {data.product_pictures.map((picture, index) => {
            console.log(picture);
            return (
              <div>
                <img src={picture.secure_url} alt="" />
              </div>
            );
          })}
        </div>
        <div>
          {data.product_details.map((infos, index) => {
            console.log(infos);
            return (
              <div>
                <p>MARQUE:{infos.MARQUE}</p>
                <p>ÉTAT:{infos.ÉTAT}</p>
                <p>COULEUR:{infos.COULEUR}</p>
                <p>EMPLACEMENT:{infos.EMPLACEMENT}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Offer;
