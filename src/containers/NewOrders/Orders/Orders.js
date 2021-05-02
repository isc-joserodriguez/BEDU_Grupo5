import React, { useState, useEffect } from 'react';
import Order from './Order/Order';
import Container from 'react-bootstrap/Container';
import OrderModal from '../../../components/UI/OrderModal/OrderModal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { filterOrders, getOrderById, updateState } from '../../../services'
const Orders = () => {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({
    _id: '',
    idCliente: {},
    idChef: {},
    idMesero: {},
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    filterOrders({
      setOrders, setFilteredOrders, setLoading, filter: {
        status: localStorage.getItem('type') === 'chef' ?
          1 :
          localStorage.getItem('type') === 'mesero' ? 3 : -1
      }
    });
  }, [])
  const orderDetail = (orderId) => {
    getOrderById(
      {
        id: orderId,
        setOrder
      }
    )
  };

  const changeStatusHandler = (id) => {
    let ordersArray = [...orders];
    let indexModif = ordersArray.findIndex(element => element._id === id);
    switch (ordersArray[indexModif].status) {
      case 1:
        ordersArray[indexModif].status = (localStorage.getItem('type') === 'admin' || localStorage.getItem('type') === 'cliente') ? 0 : 2;
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
      setFilteredOrders: setOrders,
      ordersArray,
      setOrder,
      setOrders,
      filter: {
        status: localStorage.getItem('type') === 'chef' ?
          1 :
          localStorage.getItem('type') === 'mesero' ? 3 : -1
      }
    })
  }
  const ordersMap = orders.map(order => (
    <Order
      key={order._id}
      idPedido={order._id.substring(order._id.length - 7)}
      idCliente={order.idCliente}
      idChef={order.idChef}
      idMesero={order.idMesero}
      info={order.info}
      cost={order.cost}
      status={order.status}
      orderDetail={() => orderDetail(order._id)}
      handleShow={() => handleShow()}
      handleClose={() => handleClose()}
    />
  ));
  return (
    <div className='overflow-auto'>
      <Container className='overflow-auto vh-75'>
        {loading ?
          <Spinner /> :
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 overflow-auto'>
            {ordersMap}
          </div>}
      </Container>
      <OrderModal
        order={order}
        show={show}
        handleShow={() => handleShow()}
        handleClose={() => handleClose()}
        changeStatusHandler={changeStatusHandler}
        loading={loading}
      />
    </div>
  );
}
export default Orders;