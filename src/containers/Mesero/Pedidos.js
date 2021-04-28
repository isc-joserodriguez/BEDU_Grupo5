import React, { useState, useEffect } from "react";
import Pedido from "./Pedido";
import Container from "react-bootstrap/Container";
import OrderModal from "./OrderModal";
import Spinner from '../../components/UI/Spinner/Spinner';
import { getOrdersHistory, getOrderById } from '../../services'
function Pedidos() {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    getOrdersHistory({ setOrders, setFilteredOrders, setLoading });
  },[])
  /* const ordersTest = (
            {
                idPedido: '1',
                idCliente: '1',
                idChef: '',
                idMesero: '',
                info: ['chilaquiles','jugo de naranja'],
                cost: 75.50,
                status: 1
                Status
                0 -Cancelado
                1 - Pendiete
                2 - Preparando
                3 - Preparado
                4 - Entregado
            }
    ) */
  const orderDetail = (orderId) => {
    getOrderById(
      {
        id:orderId, 
        setOrder
      }
      )
  };
  const ordersMap = orders.map(order => (
    <Pedido
      key={order.idPedido}
      idPedido={order._id.substring(order._id.length-7)}
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
    <div className="overflow-auto">
      <Container className="overflow-auto vh-75">
        {loading?
        <Spinner />:
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 overflow-auto">
          {ordersMap}
        </div>}
      </Container>
      <OrderModal
      order={order}
        show={show}
        handleShow={() => handleShow()}
        handleClose={() => handleClose()}
      ></OrderModal>
    </div>
  );
}
export default Pedidos;