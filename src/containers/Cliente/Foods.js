import React, { useState, useEffect } from "react";
import Food from "./Food";
import Container from "react-bootstrap/Container";
import FoodModal from "./FoodModal";
import Spinner from '../../components/UI/Spinner/Spinner';
import { getFoods, getFoodById } from '../../services/foods'

function Foods() {
  const [show, setShow] = useState(false);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(()=>{
    getFoods({ setFoods, setFilteredFoods, setLoading });
  },[])

  const foodDetail = (foodId) => {
    getFoodById(
      {
        id:foodId, 
        setFood
      }
      )
  };

  const foodsMap = foods.map(foods => (
    <Food
      key={foods.idFood}
      idFood={foods._id.substring(foods._id.length-7)}
      name={foods.name}
      descripcion={foods.description}
      cost={foods.cost}
      foodDetail={() => foodDetail(foods._id)} 
      handleShow={() => handleShow()}
      handleClose={() => handleClose()}
    />
  ));
  return (
    <div className="overflow-auto">
      <Container className="overflow-auto vh-75">
        {loading?
        <Spinner />:
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 overflow-auto">
          {foodsMap}
        </div>}
      </Container>
      <FoodModal
      food={food}
        show={show}
        handleShow={() => handleShow()}
        handleClose={() => handleClose()}
      ></FoodModal>
    </div>
  );
}
export default Foods;
