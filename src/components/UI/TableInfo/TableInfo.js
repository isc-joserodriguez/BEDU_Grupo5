import React from 'react'
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';

const TableInfo = ({ headers, rows }) => (
    <Table responsive bordered hover className='text-center'>
        <thead>
            <tr>
                {headers.map((el, index) => <th key={index}>{el}</th>)}
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </Table>

)

TableInfo.propTypes = {
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
}

export default TableInfo
