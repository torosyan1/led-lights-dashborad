import React, { useState, useEffect, useCallback } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import getToken from '../../utils/getToken';
import { Button, Link } from '@mui/material';
import BasicModal from './Modal';
import axios from 'axios';
import ConutModal from './ContProductModal';

export default function Store() {
  const [open, setOpen] = useState(false);
  const [products, steProducts] = useState([])
  const [render, setRender] = useState(0)
  const [isEditProduct, setIsEditProduct] = useState(false)

  useEffect(() => {
    const getItems = () =>{
      axios(`${process.env.REACT_APP_API}api/getAllShops`, {
        headers: { authorization: getToken()}
      }).then((res)=>steProducts(res.data));
    }
    getItems()
  }, [render])

  const openModal = () => {
    setOpen(true)
  }

  const removeItem = useCallback (async (shopId) => {
    await axios(`${process.env.REACT_APP_API}api/deleteShop`, {
      method: 'delete',
      params: { shopId },
      headers: { authorization: getToken() }
    })
    setRender(shopId);
  },[]) 
  const editItem = (itemId, price) =>{
    setIsEditProduct([itemId, price])
    setOpen(true)
  };
  return (
    <List dense sx={{ width: '100%' }}>

      {open && <BasicModal setIsEditProduct={setIsEditProduct} isEditProduct={isEditProduct} setRender={setRender} open={open} setOpen={setOpen} />}
      <div style={{ display: 'flex', paddingLeft: '15px', paddingRight: '15px', }}>
      <Button variant='contained' onClick={openModal}>Add new stor</Button>
      </div>
      {products?.length && products.map((value) => {
        const { name, address, description, items, shopId } = value;
        const labelId = `checkbox-list-secondary-label-${name}`;
        return (
          <>
          <ListItem
            key={name}
            secondaryAction={
              <>
                <ModeEditIcon onClick={()=>editItem(shopId, address)} style={{ cursor: 'pointer', color: '#1976d2' }} />
                <DeleteIcon onClick={() => removeItem(shopId)} style={{ cursor: 'pointer', color: '#ef5350'  }} />
              </>
            }
            disablePadding
          >
            <ListItemButton >
              <ListItemAvatar>
                  <Link href={'/dashboard/stories/'+value.shopId}>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </Link>
              </ListItemAvatar >
              <ListItemText style={{display: 'flex', justifyContent: 'center'}} id={labelId} primary={name} />
              <ListItemText style={{display: 'flex', justifyContent: 'center'}}  id={labelId} primary={address} />
              <ListItemText style={{display: 'flex', justifyContent: 'center'}}  id={labelId} primary={description} />
            </ListItemButton>
          </ListItem>
          <Divider variant="inset"/>
          </>
        );
      })}
    </List>
  );
}