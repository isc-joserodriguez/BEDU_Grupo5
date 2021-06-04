import React, { useState, useEffect } from 'react';
import Order from './Order/Order';
import Container from 'react-bootstrap/Container';
import OrderModal from '../OrderModal/OrderModal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { getPending, updateState } from '../../services'
const NewOrders = () => {
    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        getPending({ setOrders, setLoading });
    }, [])

    const changeStatusHandler = async (id) => {
        let ordersArray = [...orders];
        let indexModif = ordersArray.findIndex(element => element._id === id);

        ordersArray[indexModif].status = ordersArray[indexModif].status === 1 ?
            (localStorage.getItem('type') === 'admin' || localStorage.getItem('type') === 'cliente' ? 0 : 2) :
            ordersArray[indexModif].status + 1;

        await updateState({
            id: ordersArray[indexModif]._id,
            data: { status: ordersArray[indexModif].status },
            setLoading,
            setOrder
        })

        await getPending({ setOrders, setLoading });

        return ordersArray[indexModif];
    }
    const ordersMap = orders.map(order => (
        <Order
            key={order._id}
            order={order}
            setOrder={setOrder}
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
                orderID={order?._id}
                show={show}
                handleClose={() => handleClose()}
                changeStatusHandler={changeStatusHandler}
            />
        </div>
    );
}
export default NewOrders;