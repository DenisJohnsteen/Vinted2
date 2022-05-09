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
          <p>{data.product_price}€</p>
          {data.product_details.map((infos, index) => {
            // console.log(infos);
            const keys = Object.keys(infos);
            return (
              <div key={index}>
                {keys[0]} : {infos[keys[0]]}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Offer;
