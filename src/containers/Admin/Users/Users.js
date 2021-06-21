import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import SearchPanel from '../SearchPanel/SearchPanel';
import TableInfo from '../../../components/UI/TableInfo/TableInfo';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Pagination from '../../../components/UI/Pagination/Pagination';
import { ImEye as DetailIcon } from 'react-icons/im';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap'

import { getUsers, filterUsers } from '../../../services';

import classes from './Users.module.css';

const Users = () => {

    const [users, setUsers] = useState([]);
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
    const [typeForm, setTypeForm] = useState({
        admin: {
            elementType: 'check',
            label: 'Administrador',
            value: false,
            valid: true
        },
        chef: {
            elementType: 'check',
            label: 'Chef',
            value: false,
            valid: true
        },
        mesero: {
            elementType: 'check',
            label: 'Mesero',
            value: false,
            valid: true
        },
        cliente: {
            elementType: 'check',
            label: 'Cliente',
            value: false,
            valid: true
        },
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
    const [apellidoForm, setApellidoForm] = useState({
        apellido: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Apellido',
            },
            value: '',
            valid: true
        }
    });
    const [mailForm, setMailForm] = useState({
        mail: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Mail',
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
            typeForm,
            nombreForm,
            apellidoForm,
            mailForm
        ];
        forms.forEach(form => {
            for (let input in form) {
                filter[input] = form[input].value;
            }
        });
        setLoading(true)
        filterUsers({ setUsers, setLoading, filter });
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
        setTypeForm({
            admin: {
                elementType: 'check',
                label: 'Administrador',
                value: false,
                valid: true
            },
            chef: {
                elementType: 'check',
                label: 'Chef',
                value: false,
                valid: true
            },
            mesero: {
                elementType: 'check',
                label: 'Mesero',
                value: false,
                valid: true
            },
            cliente: {
                elementType: 'check',
                label: 'Cliente',
                value: false,
                valid: true
            },
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
        setApellidoForm({
            apellido: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Apellido',
                },
                value: '',
                valid: true
            }
        });
        setMailForm({
            mail: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Mail',
                },
                value: '',
                valid: true
            }
        });
        setLoading(true)
        getUsers({ setUsers, setLoading });
    }

    useEffect(() => {
        getUsers({ setUsers, setLoading });
    }, [])


    return (
        <div className={classes.Users}>
            <SearchPanel
                statusForm={statusForm}
                setStatusForm={setStatusForm}
                typeForm={typeForm}
                setTypeForm={setTypeForm}
                nombreForm={nombreForm}
                setNombreForm={setNombreForm}
                apellidoForm={apellidoForm}
                setApellidoForm={setApellidoForm}
                mailForm={mailForm}
                setMailForm={setMailForm}
                filterHandler={filterHandler}
                clearFilter={clearFilter}
            />
            <br />
            <Card className={classes.Card}>
                <section className={classes.buttonContainer}>
                    <Link to='/admin/users/new-user'><Button className={classes.orangeBtn} size='sm'><p className={classes.big}>+</p> Nuevo usuario</Button></Link>
                </section>
                {loading ?
                    <Spinner /> :
                    <div className={classes.Table}>
                        <TableInfo
                            headers={['ID', 'Tipo', 'Nombre(s)', 'Apellido(s)', 'Email', 'Estado', 'Detalles']}
                            rows={[...users].splice(10 * (page - 1), 10).map(el => (
                                <tr key={el._id}>
                                    <td>{el._id.substring(el._id.length - 7)}</td>
                                    <td>{el.type}</td>
                                    <td>{el.firstName}</td>
                                    <td>{el.lastName}</td>
                                    <td>{el.email}</td>
                                    <td>{el.status ? 'Activo' : 'Desactivado'}</td>
                                    <td><Link to={`/admin/users/${el._id}`}><DetailIcon className={`${classes.blue}`} /></Link></td>
                                </tr>
                            ))
                            }
                        />
                    </div>
                }
                <div className="d-flex justify-content-center mt-3">
                    <Pagination
                        elements={users}
                        active={page}
                        setActive={setPage}
                    />
                </div>

            </Card>
        </div>
    )
}

export default Users;
