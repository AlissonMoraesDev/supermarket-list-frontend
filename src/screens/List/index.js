import './index.css';
import { useEffect, useState } from "react"
import { getList } from "../../services/request"
import { Button, ListRender, Loader, Modal } from "../../components";


export const ListScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadListItems = async () => {
    setLoading(true);
    const result = await getList();
    setListData(result);
    setLoading(false);
  }

  useEffect(() => {
    loadListItems();
  }, [])

  const onClickAddButton = () => {
    setSelectedItem(null);
    setModalVisible(true);
  }

  const onCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  }

  const onEditItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  }
  
  return (
    <div className="list-screen-container">
      <div className="list-screen-content-container">
        <div className='list-screen-header'>
          <div className='list-screen-title-container'>
            <img className='logo-image' src="/images/logo.png" alt='supermarket-list-logo' />
            <h1 className='list-screen-header-title'>Lista Supermercado</h1>
          </div>
          <div className='list-screen-header-button-container'>
            <Button onClick={onClickAddButton}>Adicionar</Button>
          </div>
        </div>
        <div className='list-items'>
          {
            loading ? <Loader /> : <ListRender onEdit={onEditItem} list={listData} />
          }
        </div>
      </div>
      {modalVisible && <Modal item={selectedItem} onClose={onCloseModal} />}
    </div>
  )
}