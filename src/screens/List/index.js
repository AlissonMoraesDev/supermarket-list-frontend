import './index.css';
import { useEffect, useState } from "react"
import { getList } from "../../services/request"
import { ListCard } from "../../components";


export const ListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);

  const loadListItems = async () => {
    const result = await getList();
    setListData(result);
    setLoading(false);
  }

  useEffect(() => {
    loadListItems();
  }, [])
  
  return (
    <div className="list-screen-container">
      <div className="list-screen-content-container">
        <div className='list-screen-header'>
          <img className='logo-image' src="/images/logo.png" alt='supermarket-list-logo' />
          <h1>Lista Supermercado</h1>
        </div>
        <div className='list-items'>
          { loading && <h3>Carregando...</h3>}
          {
            !listData && listData?.length > 0 ? listData.map(item =>  <ListCard key={item._id} item={item} />) : <h3>Sua lista está vazia, adicione um novo cliacando no botão de "Adicionar"</h3>
          }
        </div>
      </div>
    </div>
  )
}