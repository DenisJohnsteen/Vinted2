import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
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
    <div className="container">
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
            <Link className="header-link1">s'inscrire</Link>
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
        <section>
          <img
            className="banner-img"
            src="https://www.vinted.fr/assets/seller-promotion/other/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg"
            alt=""
          />
        </section>

        <h1>Articles Populaire</h1>

        <section className="offers">
          {data.offers.map((offer, index) => {
            // console.log(offer.product_pictures);
            const id = offer._id;
            // console.log(id);
            return (
              <>
                <div>
                  <div key={index}>
                    {offer.product_pictures.map((picture, num) => {
                      return (
                        <div key={num}>
                          <Link to={`/offer/${id}`}>
                            <img src={picture.secure_url} alt="" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <p>{offer.product_price}€</p>
                  </div>

                  <div>
                    {offer.product_details.map((brand) => {
                      return <p>{brand.MARQUE}</p>;
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Home;
