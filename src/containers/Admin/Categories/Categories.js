import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Filter from '../../../components/Filter/Filter';
import TableInfo from '../../../components/UI/TableInfo/TableInfo';
import Spinner from '../../../components/UI/Spinner/Spinner';

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
            <Filter />
            <Card className={classes.Card}>
                {loading ?
                    <Spinner /> :
                    <div className={classes.Table}>
                        <TableInfo
                            headers={['ID', 'Nombre', 'Descripción', 'Estado']}
                            rows={categories.map((el, index) => (
                                <tr key={index}>
                                    <td>{el._id.substring(el._id.length - 7)}</td>
                                    <td>{el.name}</td>
                                    <td>{el.description}</td>
                                    <td>{el.status}</td>
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
