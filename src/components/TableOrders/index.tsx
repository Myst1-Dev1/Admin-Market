import { useOrders } from '../../services/hooks/useOrders';
import './styles.scss';

export function TableOrders() {
    const { orders } = useOrders();

    return(
        <div className='container mt-3'>
            <h4>Pedidos recentes</h4>

            <div className='table-responsive'>
            <table className="table table-border border-dark">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Status</th>
                    <th scope="col">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.name}</td>
                          <td>{Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(order.value)}</td>
                        <td id='status' className={order.status === 'Pendente' ? 'bg-warning' : 'bg-success' &&
                                        order.status === 'Retornado' ? 'bg-danger' : 'bg-success'}>
                            {order.status}
                        </td>
                          <td>{Intl.DateTimeFormat('pt-br',).format(
                            new Date(order.createdAt)
                          )}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}