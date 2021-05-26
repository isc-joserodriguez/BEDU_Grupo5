import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SearchPanel from '../../SearchPanel/searchPanel';
import TableInfo from '../../../components/UI/TableInfo/TableInfo';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { ImEye as DetailIcon } from 'react-icons/im';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

import { getCategories } from '../../../services';

import classes from './Categories.module.css';

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories({ setCategories, setLoading });
    }, []);

    return (
        <div className={`${classes.Categories}`}>
            <SearchPanel />
            <Card className={classes.Card}>
                <section className={classes.buttonContainer}>
                    <Link to='/admin/categories/new-category'><Button className={classes.orangeBtn} size='sm'><p className={classes.big}>+</p> Nueva categoría</Button></Link>
                </section>
                {loading ?
                    <Spinner /> :
                    <div className={classes.Table}>
                        <TableInfo
                            headers={['ID', 'Nombre', 'Descripción', 'Estado', 'Ver']}
                            rows={categories.map((el, index) => (
                                <tr key={index}>
                                    <td>{el._id.substring(el._id.length - 7)}</td>
                                    <td>{el.name}</td>
                                    <td>{el.description}</td>
                                    <td>{el.status}</td>
                                    <td><Link to={`/admin/categories/${el._id}`}><DetailIcon className={`${classes.blue}`} /></Link></td>
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

export default Categories
