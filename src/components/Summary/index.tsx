import './styles.scss';
import { FiArrowUp, FiArrowDown, FiDollarSign } from 'react-icons/fi';
import { useOrders } from '../../services/hooks/useOrders';

export function Summary() {
    const {orders} = useOrders();

    const summary = orders.reduce((acc, order) => {
        if(order.status === 'Entregue') {
            acc.delivered += order.value;
            acc.total += order.value;
        }
        if(order.status === 'Retornado') {
            acc.returned += order.value;
            acc.total -= order.value;
        }

        return acc;
    }, {
        delivered:0,
        pending:0,
        returned:0,
        total:0
    })

    return (
        <div className='container'>
            <div className='summary-container d-flex justify-content-evenly align-items-center'>
                <div className='summary-card bg-light'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h6>Entradas</h6>
                        <FiArrowUp className='icon text-success'/>
                    </div>
                    <h3 className='mt-1'>
                        {Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(summary.delivered)}
                    </h3>
                </div>

                <div className='summary-card bg-light'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h6>Saída</h6>
                        <FiArrowDown className='icon text-danger'/>
                    </div>
                    <h3 className='mt-1'>
                        {Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(summary.returned)}
                    </h3>
                </div>

                <div className='summary-card bg-success text-light'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h6>Total</h6>
                        <FiDollarSign className='icon'/>
                    </div>
                    <h3 className='mt-1'>
                        {Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(summary.total)}
                    </h3>
                </div>
            </div>
        </div>
    )
}