import React, { useState, useEffect, useCallback } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import getToken from '../../utils/getToken';
import { Button, TextField } from '@mui/material';
import BasicModal from './Modal';
import axios from 'axios';

export default function CheckboxListSecondary() {
  const [open, setOpen] = useState(false);
  const [products, steProducts] = useState([])
  const [render, setRender] = useState(0)
  const [isEditProduct, setIsEditProduct] = useState(false)
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getItems = () =>{
      axios(`${process.env.REACT_APP_API}api/getAllItems`, {
        headers: { authorization: getToken()}
      }).then((res)=>steProducts(res.data));
    }
    if(search === ''){
      getItems()
    }
  }, [render, search])

  useEffect(() => {
    products.map((el)=>{
      console.log(el);
      if(Number(search) === el.code) {
        steProducts([el])
      }
    })
  }, [search])
 
  const openModal = () => {
    setOpen(true)
  }

  const removeItem = useCallback (async (itemId) => {
    await axios(`${process.env.REACT_APP_API}api/removeItem`, {
      method: 'delete',
      params: { itemId },
      headers: { authorization: getToken() }
    });
    setRender(itemId);
  },[]) 
  const editItem = (itemId, price) =>{
    setIsEditProduct([itemId, price])
    setOpen(true)
  };
  const searchHandler = (e) =>{
    setSearch(e.target.value)
  }
  return (
    <List dense sx={{ width: '100%' }}>
      <div style={{display: 'flex', paddingLeft: '15px', paddingRight: '15px', justifyContent: 'space-between'  }}>
      {open && <BasicModal isEditProduct={isEditProduct} setIsEditProduct={setIsEditProduct} setRender={setRender} open={open} setOpen={setOpen} />}
      <Button variant='contained' onClick={openModal}>Add new product</Button>
      <TextField id="outlined-basic" onChange={(e)=>searchHandler(e)} label="Search" variant="outlined" />
      </div>
      {products?.length && products.map((value) => {
        const { name, price, count, code, itemId } = value;
        const labelId = `checkbox-list-secondary-label-${name}`;
        return (
          <ListItem
            key={name}
            secondaryAction={
              <>
                <ModeEditIcon onClick={()=>editItem(itemId, price)} style={{ cursor: 'pointer', color: '#1976d2' }} />
                <DeleteIcon onClick={() => removeItem(itemId)} style={{ cursor: 'pointer',  color: '#ef5350' }} />
              </>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={name} />
              <ListItemText id={labelId} primary={price} />
              <ListItemText id={labelId} primary={count} />
              <ListItemText id={labelId} primary={code} />

            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}