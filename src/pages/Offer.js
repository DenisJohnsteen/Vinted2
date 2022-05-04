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
          `https://lereacteur-vinted-api.herokuapp.com/offers/:${id}`
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
    <div>
      {data.offers.map((offer, index) => {
        return (
          <div>
            {offer.product_detail.map((product, num) => {
              return (
                <div>
                  <h1>{product.MARQUE}</h1>
                  <h1>{product.ÉTAT}</h1>
                  <h1>{product.COULEUR}</h1>
                  <h1>{product.EMPLACEMENT}</h1>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Offer;
