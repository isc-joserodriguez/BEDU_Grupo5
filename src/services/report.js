import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {getStatus} from '../shared/utility';

export const generatePDF = orders => {
    const doc = new jsPDF();

    doc.text("Reporte de Ordenes.", 14, 15);

    const tableColumn = [
        'ID',
        'Fecha',
        'Cliente',
        'Chef',
        'Mesero',
        'Productos',
        'Costo',
        'Estado'
    ]
    const tableRows = [];

    orders.forEach(order => {
        let date = new Date(order.createdAt);
        const orderData = [
            order._id,
            `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`,
            `${order.idCliente.firstName} ${order.idCliente.lastName}`,
            order.idChef ? `${order?.idChef?.firstName} ${order?.idChef?.lastName}` : 'N/A',
            order.idMesero ? `${order?.idMesero?.firstName} ${order?.idMesero?.lastName}` : 'N/A',
            `${order.info.length} productos`,
            `$${order.cost.toFixed(2)}`,
            getStatus(order.status)
        ]
        tableRows.push(orderData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    doc.save(`report_${dateStr}.pdf`);
}

export default generatePDF;