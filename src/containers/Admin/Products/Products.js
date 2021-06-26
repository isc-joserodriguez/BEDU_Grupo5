import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SearchPanel from '../SearchPanel/SearchPanel';
import TableInfo from '../../../components/UI/TableInfo/TableInfo';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Pagination from '../../../components/UI/Pagination/Pagination';
import { ImEye as DetailIcon } from 'react-icons/im';
import { Card, Image } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { getProductsByCategory, filterProducts, toggleStatusProduct } from '../../../services';
import Toggle from 'react-toggle';

import classes from './Products.module.css';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [statusForm, setStatusForm] = useState({
        inactivo: {
            elementType: 'check',
            label: 'Inactivo',
            value: false,
            valid: true
        },
        activo: {
            elementType: 'check',
            label: 'Activo',
            value: false,
            valid: true
        }
    });
    const [priceForm, setPriceForm] = useState({
        minPrice: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Precio minimo',
            },
            value: '',
            valid: true
        },
        maxPrice: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Precio máximo',
            },
            value: '',
            valid: true
        }
    });
    const [nombreForm, setNombreForm] = useState({
        nombre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nombre',
            },
            value: '',
            valid: true
        }
    });
    const [descripcionForm, setDescripcionForm] = useState({
        descripcion: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Descripción',
            },
            value: '',
            valid: true
        }
    });
    const [categoriaForm, setCategoriaForm] = useState({
        categoria: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Categoria',
            },
            value: '',
            valid: true
        }
    });
    const [page, setPage] = useState(1);
    const filterHandler = () => {
        const filter = {};
        const forms = [
            statusForm,
            priceForm,
            nombreForm,
            descripcionForm,
            categoriaForm
        ];
        forms.forEach(form => {
            for (let input in form) {
                filter[input] = form[input].value;
            }
        });
        setLoading(true)
        setPage(1);
        filterProducts({ setProducts, setLoading, filter });
    }

    const clearFilter = () => {
        setStatusForm({
            inactivo: {
                elementType: 'check',
                label: 'Inactivo',
                value: false,
                valid: true
            },
            activo: {
                elementType: 'check',
                label: 'Activo',
                value: false,
                valid: true
            }
        });
        setPriceForm({
            minPrice: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Precio minimo',
                },
                value: '',
                valid: true
            },
            maxPrice: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Precio máximo',
                },
                value: '',
                valid: true
            }
        });
        setNombreForm({
            nombre: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nombre',
                },
                value: '',
                valid: true
            }
        });
        setDescripcionForm({
            descripcion: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Descripción',
                },
                value: '',
                valid: true
            }
        });
        setCategoriaForm({
            categoria: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Categoria',
                },
                value: '',
                valid: true
            }
        });
        setLoading(true)
        setPage(1);
        getProductsByCategory({ setProducts, setLoading, filter: { } });
    }

    useEffect(() => {
        getProductsByCategory({ setProducts, setLoading, filter: { } });
    }, []);

    return (
        <div className={`${classes.Products}`}>
            <SearchPanel
                statusForm={statusForm}
                setStatusForm={setStatusForm}
                priceForm={priceForm}
                setPriceForm={setPriceForm}
                nombreForm={nombreForm}
                setNombreForm={setNombreForm}
                descripcionForm={descripcionForm}
                setDescripcionForm={setDescripcionForm}
                categoriaForm={categoriaForm}
                setCategoriaForm={setCategoriaForm}
                filterHandler={filterHandler}
                clearFilter={clearFilter}
            />
            <br />
            <Card className={classes.Card}>
                <section className={classes.buttonContainer}>
                    <Link to='/admin/products/new-product'><Button className={classes.orangeBtn} size='sm'><p className={classes.big}>+</p> Nuevo producto</Button></Link>
                </section>
                {loading ?
                    <Spinner /> :
                    <div className={classes.Table}>
                        <TableInfo
                            headers={['ID', 'Foto', 'Nombre', 'Descripción', 'Costo', 'Categoria', 'Estado', 'Ver']}
                            rows={[...products].splice(10 * (page - 1), 10).map((el, index) => (
                                <tr key={index}>
                                    <td>{el._id.substring(el._id.length - 7)}</td>
                                    <td><Image className={classes.ProductImage} style={{}} src={el.image} thumbnail /></td>
                                    <td>{el.name}</td>
                                    <td>{el.description}</td>
                                    <td>{el.cost}</td>
                                    <td className={!!!el.idCategoria.status ? 'text-muted' : ''}>{el.idCategoria.name}</td>
                                    <td>
                                        <Toggle

                                            checked={el.status}
                                            onChange={() => {
                                                const newProducts = [...products];
                                                newProducts[10 * (page - 1) + index].status = !products[10 * (page - 1) + index].status;
                                                setProducts(newProducts);
                                                toggleStatusProduct({ id: el._id, status: el.status })
                                            }} />
                                    </td>
                                    <td><Link to={`/admin/products/${el._id}`}><DetailIcon className={`${classes.blue}`} /></Link></td>
                                </tr>

                            ))
                            }
                        />
                    </div>
                }
                {!loading &&
                    <div className="d-flex justify-content-center mt-3">
                    <Pagination
                        elements={products}
                        active={page}
                        setActive={setPage}
                    />
                </div>
                }
                

            </Card>
        </div>
    )
}

export default Products
