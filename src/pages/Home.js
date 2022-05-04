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
        <input type="text" />
        <nav>
          <button>
            <Link to="/">s'inscrire</Link>
          </button>
          <button>
            <Link to="/">se connecter</Link>
          </button>
          <button>
            <Link to="/">vends tes articles</Link>
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

        <section className="offers">
          {data.offers.map((offer, index) => {
            // console.log(offer.product_pictures);
            const id = offer._id;
            console.log(id);
            return (
              <>
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
              </>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Home;
