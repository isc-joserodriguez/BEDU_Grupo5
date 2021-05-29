import React from 'react'

import { Table } from 'react-bootstrap';

const TableInfo = ({ headers, rows }) => {

    return (
        <Table responsive bordered hover className="text-center">
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
}

export default TableInfo
