import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SearchPanel from '../SearchPanel/SearchPanel';
import TableInfo from '../../../components/UI/TableInfo/TableInfo';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Pagination from '../../../components/UI/Pagination/Pagination';
import { ImEye as DetailIcon } from 'react-icons/im';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Toggle from 'react-toggle';

import { getCategories, filterCategories, toggleStatusCategory } from '../../../services';

import classes from './Categories.module.css';

const Categories = () => {

    const [categories, setCategories] = useState([]);
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
    const [page, setPage] = useState(1);

    const filterHandler = () => {
        const filter = {};
        const forms = [
            statusForm,
            nombreForm,
            descripcionForm
        ];
        forms.forEach(form => {
            for (let input in form) {
                filter[input] = form[input].value;
            }
        });
        setLoading(true)
        setPage(1);
        filterCategories({ setCategories, setLoading, filter });
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
        setLoading(true)
        setPage(1);
        getCategories({ setCategories, setLoading });
    }

    useEffect(() => {
        getCategories({ setCategories, setLoading });
    }, []);

    return (
        <div className={classes.Categories}>
            <SearchPanel
                statusForm={statusForm}
                setStatusForm={setStatusForm}
                nombreForm={nombreForm}
                setNombreForm={setNombreForm}
                descripcionForm={descripcionForm}
                setDescripcionForm={setDescripcionForm}
                filterHandler={filterHandler}
                clearFilter={clearFilter}
            />
            <br />
            <Card className={classes.Card}>
                <section className={classes.buttonContainer}>
                    <Link to='/admin/categories/new-category'><Button className={classes.orangeBtn} size='sm'><p className={classes.big}>+</p> Nueva categoría</Button></Link>
                </section>
                {loading ?
                    <Spinner /> :
                    <div className={classes.Table}>
                        <TableInfo
                            headers={['ID', 'Nombre', 'Descripción', 'Estado', 'Ver']}
                            rows={[...categories].splice(10 * (page - 1), 10).map((el, index) => (
                                <tr key={index}>
                                    <td>{el._id.substring(el._id.length - 7)}</td>
                                    <td>{el.name}</td>
                                    <td>{el.description}</td>
                                    <td>
                                        <Toggle

                                            checked={el.status}
                                            onChange={() => {
                                                const newCategories = [...categories];
                                                newCategories[10 * (page - 1) + index].status = !categories[10 * (page - 1) + index].status;
                                                setCategories(newCategories);
                                                toggleStatusCategory({ id: el._id, status: el.status })
                                            }} />
                                    </td>
                                    <td><Link to={`/admin/categories/${el._id}`}><DetailIcon className={`${classes.blue}`} /></Link></td>
                                </tr>
                            ))
                            }
                        />
                    </div>
                }
                {!loading &&
                    <div className="d-flex justify-content-center mt-3">
                        <Pagination
                            elements={categories}
                            active={page}
                            setActive={setPage}
                        />
                    </div>
                }

            </Card>
        </div>
    )
}

export default Categories
