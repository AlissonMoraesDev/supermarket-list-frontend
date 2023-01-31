import { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import './index.css';

export const Modal = ({ onClose }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)
  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1>Adicionar novo item</h1>
          <button onClick={onClose} className='modal-close-button' />
        </div>
        <Input 
          onChange={(text) => setName(text)} 
          value={name} 
          label="Produto" 
          placeholder="Ex: produto" 
        />
        <Input 
          onChange={(text) => setQuantity(text)} 
          value={quantity} 
          label="Quantidade"
          type="number" 
        />
          <div className='modal-space' />
          <Button>Salvar item</Button>
        </div>
    </div>
  )
}