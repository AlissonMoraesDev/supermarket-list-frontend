import { useEffect, useState } from 'react';
import './index.css';

import { Button } from '../Button';
import { Input } from '../Input';
import { createItem, updateItem, deleteItem } from '../../services/request'



export const Modal = ({ onClose, item }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)

  const validateBeforeSave = () => {
    if(name.length < 3) {
      alert('O nome do item precisa ter mais que 3 caracteres!');
      return false;
    }

    if(quantity < 1) {
      alert('A quantidade do item não pode ser menor do que 1!');
      return false;
    }

    return true;
  }

  const callSaveItem = async () => {
    const validade = validateBeforeSave();

    if(validade) {
      const result = await createItem({ name, quantity: Number(quantity) });
  
      if(!result?.error) {
        alert('Item salvo com sucesso!');
        onClose();
      }
    }
  }

  const callUpdateItem = async () => {
    const validade = validateBeforeSave();

    if(validade) {
      const result = await updateItem( item?._id, {
        name, 
        quantity: Number(quantity),
        checked: item?.checked
      });
  
      if(!result?.error) {
        alert('Item atualizado com sucesso!');
        onClose();
      }
    }
  }

  const callDeleteItem = async () => {
    const result = await deleteItem(item?._id);
    if(!result?.error) {
      alert('Item deletado com sucesso!');
      onClose();
    }

  }

  useEffect(() => {
    if(item?.name && item?.quantity) {
      setName(item?.name);
      setQuantity(item?.quantity);
    }
  },[item])

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1>{item ? 'Editar item' : 'Adicionar novo item'}</h1>
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
          <div className='buttons-container'>
            {item && <Button icon='trash' variant="outline" onClick={callDeleteItem}>Deletar item</Button> }
            <Button onClick={item ? callUpdateItem : callSaveItem}>
              {item ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </div>
    </div>
  )
}