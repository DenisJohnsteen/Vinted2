import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.scss";

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
    <>
      <main>
        <section>
          <img
            className="banner-img"
            src="https://www.vinted.fr/assets/seller-promotion/other/banner-wide-9b45d0aa9a311c4ff6013e9cf3bc2b6646468be3d2f553192c63598685fcc177.jpg"
            alt=""
          />
        </section>
        <div className="container">
          <h1>Articles Populaire</h1>

          <section className="offers">
            {data.offers.map((offer, index) => {
              // console.log(offer.product_pictures);
              const id = offer._id;
              // console.log(id);
              return (
                <>
                  <div>
                    <div>
                      <Link to={`/offer/${id}`}>
                        <img src={offer.product_image.secure_url} alt="" />
                      </Link>
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
        </div>
      </main>
    </>
  );
};

export default Home;
