import React, { useState, useEffect } from "react";

import Filters from "./Filters/Filters";
import OrdersList from "./OrdersList/OrdersList.js";
import SearchPanel from "../SearchPanel/searchPanel";
import OrderModal from "../../components/UI/OrderModal/OrderModal";
import Spinner from "../../components/UI/Spinner/Spinner";

import {
  filterOrders,
  deleteOrder,
  updateState,
  getOrderById,
} from "../../services";

import classes from "./OrderHistory.module.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [order, setOrder] = useState({
    _id: "",
    idCliente: {},
    idChef: {},
    idMesero: {},
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const filterHandler = () => {
    if (value.trim() !== "") {
      setFilteredOrders([...orders].filter((e) => -1 !== e.task.search(value)));
    } else {
      setFilteredOrders([...orders]);
    }
  };

  useEffect(() => {
    filterOrders({
      setOrders,
      setFilteredOrders,
      filter: { special: true },
      setLoading,
    });
  }, []);

  useEffect(() => {
    filterHandler();
  }, [orders]);

  const orderDetail = (id) => {
    getOrderById({ id, setOrder });
  };

  const changeStatusHandler = (id) => {
    let ordersArray = [...orders];
    let indexModif = ordersArray.findIndex((element) => element._id === id);
    switch (ordersArray[indexModif].status) {
      case 1:
        ordersArray[indexModif].status =
          localStorage.getItem("type") === "admin" ||
          localStorage.getItem("type") === "cliente"
            ? 0
            : 2;
        break;
      default:
        ordersArray[indexModif].status++;
        break;
    }
    /* setLoading(true); */
    updateState({
      id: ordersArray[indexModif]._id,
      data: { status: ordersArray[indexModif].status },
      setLoading,
      setOrder,
      setOrders,
      setFilteredOrders,
      filter: {
        special:
          localStorage.getItem("type") === "chef" ||
          localStorage.getItem("type") === "mesero"
            ? true
            : false,
      },
    });
  };

  const deleteOrderHandler = (id) => {
    let ordersArray = [...orders];
    console.log(ordersArray[0]);
    let indexDelete = ordersArray.findIndex((element) => element._id === id);
    console.log(indexDelete);
    ordersArray.splice(indexDelete, 1);
    /* setLoading(true); */
    deleteOrder({
      id,
      setOrders,
      ordersArray,
      setLoading,
    });
  };

  const changeValue = (newValue) => {
    if (newValue === "") setFilteredOrders([...orders]);
    setValue(newValue);
  };

  const showHide = () => {
    setShow(!show);
  };

  function showFilters() {
    console.log("Boton");
    setShowFilter(!showFilter);
  }

  return (
    <>
      <div className={classes.OrderHistory}>
        <SearchPanel />
        <div className={classes.card}>
          <Filters
            showHide={showHide}
            filterHandler={filterHandler}
            orders={orders}
            show={show}
            value={value}
            changeValue={changeValue}
          />
          {loading ? (
            <Spinner />
          ) : (
            <OrdersList
              show={show}
              handleShow={handleShow}
              change={changeStatusHandler}
              orders={filteredOrders}
              setOrder={orderDetail}
              delete={deleteOrderHandler}
              filterHandler={filterHandler}
              value={value}
            />
          )}
        </div>
      </div>

      <OrderModal
        order={order}
        show={showModal}
        handleShow={handleShow}
        handleClose={handleClose}
        changeStatusHandler={changeStatusHandler}
        loading={loading}
      />
    </>
  );
};

export default OrderHistory;
