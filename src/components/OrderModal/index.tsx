import Modal from 'react-modal';
import {FaTimes} from 'react-icons/fa';
import './styles.scss';
import { useOrders } from '../../services/hooks/useOrders';
import { FormEvent, useState } from 'react';

interface OrderModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function OrderModal({isOpen, onRequestClose}: OrderModalProps) {
    const { createOrder } = useOrders();
    
    const [name, setName] = useState('');
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState('Entregue');

    async function handleCreateNewOrder(event: FormEvent) {
      event.preventDefault();

      await createOrder({
        name,
        value,
        status
      })

      setName('');
      setValue(0);
      setStatus('Entregue');
      onRequestClose();
    }

    return (
        <Modal
            isOpen = {isOpen}
            onRequestClose={onRequestClose}
            overlayClassName = "react-modal-overlay"
            className= "react-modal-content"
            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)'
                },
                content: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  border: '1px solid #ccc',
                  background: '#fff',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '10px',
                  outline: 'none',
                  padding: '20px',
                }
              }}
        >
            <div className='modal-container'>
              <span onClick={onRequestClose} className='close-modal'><FaTimes /></span>
              <h4 className='text-center mb-4'>Cadastrar Produto</h4>
              <form onSubmit={handleCreateNewOrder} 
                className='d-flex justify-content-center align-items-center flex-column gap-4'
              >
                  <input 
                    type="text" 
                    placeholder='Name'
                    value={name}
                    onChange = {event => setName(event.target.value)}
                  />
                  <input 
                    type="number" 
                    placeholder='Valor'
                    value={value}
                    onChange = {event => setValue(Number(event.target.value))}
                  />
                  <select value={status} onChange = {event => setStatus(event.target.value)}>
                    <option value="Entregue">Entregue</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Retornado">Retornado</option>
                  </select>

                  <button type='submit'>Cadastrar produto</button>
              </form>
            </div>
            
        </Modal>
    )
}