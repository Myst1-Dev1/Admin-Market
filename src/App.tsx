import { useState } from "react";
import Modal from 'react-modal';

import { Header } from "./components/Header";
import { OrderModal } from "./components/OrderModal";
import { Summary } from "./components/Summary";
import { TableOrders } from "./components/TableOrders";
import { OrdersProvider } from "./services/hooks/useOrders";

Modal.setAppElement('#root');

function App() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  function handleOpenOrderModal() {
    setIsNewOrderModalOpen(true);
  }

  function handleCloseOrderModal() {
    setIsNewOrderModalOpen(false);
  }

  return (
    <OrdersProvider>
      <Header onOpenNewOrderModal = {handleOpenOrderModal}/>
      <Summary />
      <TableOrders />
      <OrderModal 
        isOpen = {isNewOrderModalOpen}
        onRequestClose = {handleCloseOrderModal}
      />
    </OrdersProvider>
  );
}

export default App;
