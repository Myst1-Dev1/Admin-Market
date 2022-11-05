import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/global.scss';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    order: Model,
  },
  
  seeds(server) {
    server.db.loadData({
      orders: [
        {
          id: 1,
          name: 'Star refrigerator',
          value: 1600,
          status: 'Entregue',
          createdAt: new Date('2022-10-23 09:00:00')
        },
        {
          id: 2,
          name: 'Window coolers',
          value: 110,
          status: 'Pendente',
          createdAt: new Date('2022-08-18 09:00:00')
        },
        {
          id: 3,
          name: 'Speakers',
          value: 660,
          status: 'Retornado',
          createdAt: new Date('2022-05-23 09:00:00')
        },
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/orders', () => {
      return this.schema.all('order')
    })

    this.post('/orders', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('order', data)
    })
  }
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
