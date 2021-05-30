import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import { getUserById } from '../../../../services';
import { FiEdit3 } from 'react-icons/fi';
import { Card } from 'react-bootstrap';

import classes from './User.module.css';

const User = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserById({ id, setUser, setLoading })
    }, [id])
    return (
        loading ?
            <Spinner /> :
            <Card className={classes.User}>
                <Card.Img
                    variant='top'
                    src={
                        user.type === 'admin' ?
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW4CH2TTTQuYDIpSsN8yIpiCEG6YgBVAkbpQ&usqp=CAU' :
                            user.type === 'mesero' ?
                                'data:image/jpeg;base64,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' :
                                user.type === 'chef' ?
                                    'https://media.gettyimages.com/photos/pan-fried-duck-picture-id1081422898?s=612x612' :
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh2j_No99ryewMw39sMjVID6QUf342dDk2Bw&usqp=CAU'
                    }
                />
                <Card.Body>
                    <Card.Title style={{ textTransform: 'capitalize' }}>{`${user.type}: ${user.firstName} ${user.lastName}`}</Card.Title>
                    <Card.Text>
                        {`Email: ${user.email}`}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className='text-muted'>
                        {`Ultima actualización el ${new Date(user.updatedAt).getDate()}/${new Date(user.updatedAt).getMonth() + 1}/${new Date(user.updatedAt).getFullYear()}`}
                        <br />
                        <Link className={classes.orange} to={`/admin/users/edit/${user._id}`}>Editar <FiEdit3/></Link>
                    </small>
                </Card.Footer>
            </Card>
    )
}

export default User
