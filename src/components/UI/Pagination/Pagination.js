import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PaginationComponent = (props) => {
    let {
        elements,
        elementsByPage = 10,
        active = 1
    } = props;

    const pages = Math.ceil(elements.length / elementsByPage), items = [];



    for (let i = 0; i < pages; i++) {
        items.push(
            <Pagination.Item key={i + 1} active={i + 1 === active} onClick={() => props.setActive(i + 1)}>{i + 1}</Pagination.Item>
        )

    }

    return (
        <Pagination size="md">
            <Pagination.First />
            <Pagination.Prev />

            {items}

            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    )
}

export default PaginationComponent
