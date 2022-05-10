import "./offer.scss";
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
      <div className="container-offer">
        <div className="column1">
          <img src={data.product_image.secure_url} alt="" />
        </div>
        <div className="column2">
          <p className="prix">{data.product_price} €</p>
          {data.product_details.map((infos, index) => {
            // console.log(infos);
            const keys = Object.keys(infos);
            return (
              <>
                <div className="bote">
                  <p className="para" key={index}>
                    <span className="gauche">{keys[0]} </span>
                    <span className="droite">{infos[keys[0]]}</span>
                  </p>
                </div>
              </>
            );
          })}
          <hr />
          <button className="buttonpayment">
            <Link
              to="/payment"
              state={{
                title: data.product_name,
                price: data.product_price,
                id,
              }}
            >
              Acheter
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Offer;
