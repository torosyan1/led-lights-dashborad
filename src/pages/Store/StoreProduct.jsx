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
import { Button, Link, TextField } from '@mui/material';
import BasicModal from './Modal';
import axios from 'axios';

export default function StoreProduct() {
  const [open, setOpen] = useState(false);
  const [products, steProducts] = useState([])
  const [render, setRender] = useState(0)
  const [seletedItems, setSeletedItems] = useState([])
  const [count, setCount] = useState('')
  const shopId = window.location.pathname.split('/')[3];
  useEffect(() => {
    const getItems = async () =>{
        await axios(`${process.env.REACT_APP_API}api/getAllItems`, {
          headers: { authorization: getToken()}
        }).then((res)=>steProducts(res.data));
      }
      getItems()
  }, [render])


  const addList = async (e, itemId, price) => {
      console.log(count);
    await axios(`${process.env.REACT_APP_API}api/addItemToShop`, {
        method: 'post',
        data: {
            shopId,
            itemInput: {
                itemId,
                price,
                count
            }
        },
        headers: { authorization: getToken()}
      })
  };
  const getSelectedProduct = async ()=>{
    if (!seletedItems?.length){
      const selectedItems = await axios(`${process.env.REACT_APP_API}api/getShop`, {
        params: { shopId },
        headers: { authorization: getToken()}
      })
      const { data: { items } } = selectedItems;
      console.log(items, 'aaaa');
      if(!items) return setSeletedItems([]);
      setSeletedItems(items);
      console.log(items, 'items');
    } else {
      setSeletedItems([]);
    }
  }
  return (
    <List dense sx={{ width: '100%' }}>
      <Button style={{ backgroundColor: 'black'  }} variant='contained' onClick={getSelectedProduct}>{seletedItems?.length ? 'Back to shop'  :'See All Selected Product'}</Button>
      {seletedItems?.length===0 && products?.length && products.map((value) => {
        const { name, price, itemId } = value;
        const labelId = `checkbox-list-secondary-label-${name}`;
        return (
          <ListItem
            key={name}
            secondaryAction={
              <>
                {/* <ModeEditIcon onClick={()=>editItem(shopId, address)} style={{ cursor: 'pointer' }} />
                <DeleteIcon onClick={() => removeItem(shopId)} style={{ cursor: 'pointer' }} /> */}
              </>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                  <Link href={'/dashboard/stories/'+value.shopId}>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </Link>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={name} />
              <ListItemText id={labelId} primary={price} />
              <TextField id="outlined-basic"  label="Count" onClick={(e)=>setCount(e.target.value)} onChange={(e)=>setCount(e.target.value)} variant="outlined" />
              <Button variant='contained' onClick={(e) => addList(e, itemId, price)}>Add List</Button>
            </ListItemButton>
          </ListItem>
        );
      })}
      {
        seletedItems?.length > 0 && seletedItems.map((item)=> {
            return <ListItem>
              <ListItemText id={item.id} primary={item.name} />
              <ListItemText id={item.id} primary={item.count} />
              <>
                <ModeEditIcon style={{ cursor: 'pointer' }} />
                <DeleteIcon style={{ cursor: 'pointer' }} />
              </>
            </ListItem>
        })
      }
    </List>
  );
}