import "./publish.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ handleToken }) => {
  const [picture, setPicture] = useState(null);
  const [data, setData] = useState(null);
  const [isPictureSending, setIsPictureSending] = useState(false);

  // form state //
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [etat, setEtat] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [change, setChange] = useState(false);

  const handleSendOffer = async (event) => {
    event.preventDefault();
    setIsPictureSending(true);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        {
          headers: {
            Authorization: `Bearer ${handleToken}`,
            "Content-Type": "multipart/form-data",
          },
          title: title,
          description: description,
          price: price,
          condition: etat,
          city: city,
          brand: brand,
          size: size,
          color: color,
          picture: picture,
        }
      );
      console.log(response.data);
      setData(response.data);
      // alert(JSON.stringify(response.data));
    } catch (err) {
      if (err.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.response.data.msg);
      }
    }

    setIsPictureSending(false);
  };
  return (
    <div className="container">
      <form onSubmit={handleSendOffer}>
        <input
          type="file"
          value={picture}
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        />
        <input
          type="text"
          placeholder="ex: Chemise Sézane verte"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="ex: porté quelque fois, taillé correctement"
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="ex: Zara"
          name="brand"
          value={brand}
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="ex: L/40/12"
          name="size"
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="ex: Fushia"
          name="color"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Neuf avec étiquette"
          name="etat"
          value={etat}
          onChange={(event) => {
            setEtat(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="ex: Paris"
          name="city"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="0,00€"
          name="price"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input
          type="checkbox"
          onClick={() => {
            setChange(!change);
          }}
        />
        <span>Je suis intéressé(e) par les échanges</span>
        <input type="submit" value="ajouter" />
      </form>
    </div>
  );
};

export default Publish;
