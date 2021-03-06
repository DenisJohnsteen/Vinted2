import "./publish.scss";
import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Publish = ({ token }) => {
  // Import image //
  const [picture, setPicture] = useState(null);
  const [data, setData] = useState(null);
  const [isPictureSending, setIsPictureSending] = useState(false);

  // form state //
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(Number);
  const [exchange, setExchange] = useState(false);

  const navigate = useNavigate();

  const userToken = Cookies.get("userToken");

  const handleSendOffer = async (event) => {
    event.preventDefault();
    setIsPictureSending(true);

    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setData(response.data);

      navigate("/offer/" + response.data._id);
    } catch (err) {
      if (err.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.response.data.msg);
      }
    }

    setIsPictureSending(false);
  };
  return token ? (
    <div className="container">
      <form onSubmit={handleSendOffer}>
        <input
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        />
        <input
          type="text"
          placeholder="ex: Chemise S??zane verte"
          name="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="ex: port?? quelque fois, taill?? correctement"
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
          placeholder="Neuf avec ??tiquette"
          name="condition"
          value={condition}
          onChange={(event) => {
            setCondition(event.target.value);
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
          placeholder="0,00???"
          name="price"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input
          type="checkbox"
          onClick={() => {
            setExchange(!exchange);
          }}
        />
        <span>Je suis int??ress??(e) par les ??changes</span>
        <input type="submit" value="ajouter" />
        {isPictureSending === true ? (
          <div>Image en cours de t??l??chargement</div>
        ) : (
          data && <img src={data.secure_url} alt="" />
        )}
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
