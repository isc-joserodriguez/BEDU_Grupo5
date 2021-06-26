import React, { useState, useEffect } from 'react';

import Order from './Order/Order.js';
import SearchPanel from './SearchPanel/SearchPanel';
import OrderModal from '../OrderModal/OrderModal';
import TableInfo from '../../components/UI/TableInfo/TableInfo';
import Pagination from '../../components/UI/Pagination/Pagination';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Card, Button } from 'react-bootstrap';

import {
    filterOrders,
    getOwners,
    deleteOrder,
    updateState,
    generatePDF
} from '../../services';

import classes from './OrderHistory.module.css';

const OrderHistory = () => {
    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const headers = ['Listo', 'ID', 'Fecha', 'Cliente', 'Cant.productos', 'Costo', 'Detalles'];
    if (localStorage.getItem('type') === 'admin') headers.push('Cancelar/Eliminar');
    else if (localStorage.getItem('type') === 'cliente') headers.push('Cancelar');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getOwners({ setOrders, setLoading });
    }, []);

    const filterOrdersHandler = (filter) => {
        setLoading(true);
        setPage(1);
        filterOrders({
            setOrders,
            setLoading,
            filter
        });
    }

    const clearFilterOrdersHandler = () => {
        setLoading(true);
        setPage(1);
        getOwners({
            setOrders,
            setLoading
        });
    }

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
            setOrder,
            filter: {
                special:
                    localStorage.getItem('type') === 'chef' ||
                        localStorage.getItem('type') === 'mesero'
                        ? true
                        : false,
            },
        });
        return ordersArray[indexModif];
    };

    const deleteOrderHandler = (id) => {
        let ordersArray = [...orders];
        let indexDelete = ordersArray.findIndex((element) => element._id === id);
        ordersArray.splice(indexDelete, 1);
        deleteOrder({
            id,
            setOrders,
            ordersArray,
            setLoading,
        });
    };

    return (
        <>
            <div className={classes.OrderHistory}>
                <SearchPanel filterOrders={filterOrdersHandler} clearFilterOrdersHandler={clearFilterOrdersHandler} />
                <br />
                <Card className={classes.Card}>
                    <div>
                        {!loading &&
                            <>
                                <span>

                                    <p className={classes.orangeTxt}>Pedidos:</p>
                                    <p className={classes.orangeUnderlined}>{orders.length}</p>
                                </span>
                                <span>
                                    <p className={classes.orangeTxt}>Total:</p>
                                    <p className={classes.orangeUnderlined}>${orders.reduce((acc, nxt) => acc + nxt.cost, 0)}</p>
                                </span>
                            </>
                        }
                    </div>
                    {loading ?
                        <Spinner /> :
                        <div className={classes.Table}>
                            <TableInfo
                                headers={headers}
                                rows={[...orders].splice(10 * (page - 1), 10).map(order => (
                                    < Order
                                        key={order._id}
                                        order={order}
                                        change={changeStatusHandler}
                                        delete={deleteOrderHandler}
                                        handleShow={handleShow}
                                        setOrder={setOrder}
                                    />
                                )
                                )}
                            />
                        </div>}
                    {!loading &&
                        <>
                            <div className="d-flex justify-content-center mt-3">
                                <Pagination
                                    elements={orders}
                                    active={page}
                                    setActive={setPage}
                                />
                            </div>
                            <Button className={classes.orangeBtn} type='submit' variant='primary' size='lg' block onClick={() => generatePDF(orders)}>
                                Generar reporte
                            </Button>
                        </>
                    }
                </Card>
            </div>
            <OrderModal
                orderID={order?._id}
                show={show}
                handleClose={handleClose}
                changeStatusHandler={changeStatusHandler}
            />
        </>
    );
};

export default OrderHistory;
