import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = (props) => {
    let {
        elements,
        elementsByPage = 10,
        active = 1
    } = props;

    const pages = Math.ceil(elements.length / elementsByPage);
    let items = [];

    for (let i = 0; i < pages; i++) {
        items.push(
            <Pagination.Item key={i + 1} active={i + 1 === active} onClick={() => { window.scrollTo(0, 0); props.setActive(i + 1); }}>{i + 1}</Pagination.Item>
        )
    }

    if (pages > 5) {
        items = items.splice(
            active < 4 ?
                0 :
                pages < active + 3 ?
                    pages - 5 :
                    active - 2
            , 5);
    }

    return (
        elements.length!==0 &&
        <Pagination size="md">
            <Pagination.First disabled={active === 1} onClick={() => { window.scrollTo(0, 0); props.setActive(1); }} />
            <Pagination.Prev disabled={active === 1} onClick={() => { window.scrollTo(0, 0); props.setActive(active - 1); }} />

            {items}

            <Pagination.Next disabled={active === pages} onClick={() => { window.scrollTo(0, 0); props.setActive(active + 1); }} />
            <Pagination.Last disabled={active === pages} onClick={() => { window.scrollTo(0, 0); props.setActive(pages); }} />
        </Pagination>
    )
}

export default PaginationComponent
