import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import SearchPanel from '../../SearchPanel/searchPanel';
import TableInfo from '../../../components/UI/TableInfo/TableInfo';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { ImEye as DetailIcon } from 'react-icons/im';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap'

import { getUsers } from '../../../services';

import classes from './Users.module.css';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers({ setUsers, setLoading });
    }, [])


    return (
        <div className={classes.Users}>
            <SearchPanel />
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
                            rows={users.map(el => (
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

            </Card>
        </div>
    )
}

export default Users;
