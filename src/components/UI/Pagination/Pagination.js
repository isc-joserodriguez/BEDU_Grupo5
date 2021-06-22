import React from 'react';
import { Pagination } from 'react-bootstrap';

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
            <Pagination.First disabled={active === 1} onClick={() => props.setActive(1)} />
            <Pagination.Prev disabled={active === 1} onClick={() => props.setActive(active - 1)} />

            {items}

            <Pagination.Next disabled={active === pages} onClick={() => props.setActive(active + 1)} />
            <Pagination.Last disabled={active === pages} onClick={() => props.setActive(pages)} />
        </Pagination>
    )
}

export default PaginationComponent
