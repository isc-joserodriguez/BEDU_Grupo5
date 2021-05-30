import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import { getCategoryById } from '../../../../services';
import { FiEdit3 } from 'react-icons/fi';
import { Card } from 'react-bootstrap';

import classes from './Category.module.css';

const Category = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCategoryById({ id, setCategory, setLoading })
    }, [id])

    return (
        loading ?
            <Spinner /> :
            <Card className={classes.Category}>
            <Card.Header><Card.Title style={{ textTransform: 'capitalize' }}>{category.name}</Card.Title></Card.Header>
                <Card.Body>
                    <Card.Text>
                    {category.description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className='text-muted'>
                        {`Ultima actualización el ${new Date(category.updatedAt).getDate()}/${new Date(category.updatedAt).getMonth() + 1}/${new Date(category.updatedAt).getFullYear()}`}
                        <br />
                        <Link className={classes.orange} to={`/admin/categories/edit/${category._id}`}>Editar <FiEdit3/></Link>
                    </small>
                </Card.Footer>
            </Card>
    )
}

export default Category
