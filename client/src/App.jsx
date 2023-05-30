import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [id, setId] = useState('');
  const [histo, setHisto] = useState('');
  
  function getId(id) {
    setId(id);
    socket.off('id');
  }

  function getHisto(messages) {
    setHisto(messages);
    socket.off('histo');
  }

  function onConnect() {
    setIsConnected(true);
    socket.on('id', (id) => getId(id));
    socket.on('histo', (messages) => getHisto(messages));
  }

  function onDisconnect() {
    setIsConnected(false);
    setId('');
  }

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);


    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);



  return (
    <div className="App">
      <ConnectionState isConnected={ isConnected } />
      <ConnectionManager />
      <MyForm id={id} histo={histo} />
    </div>
  );
}