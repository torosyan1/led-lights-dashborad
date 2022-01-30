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
import axios from 'axios';

export default function StoreProduct() {
  const [open, setOpen] = useState(false);
  const [products, steProducts] = useState([])
  const [render, setRender] = useState(0)
  const [sleetedItems, setSeletedItems] = useState([])
  const [count, setCount] = useState('')
  const shopId = window.location.pathname.split('/')[3];
  const [search, setSearch] = useState('');

  const getSelectedProduct = async ()=>{
    if (!sleetedItems?.length){
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

  useEffect(() => {
    const getItems = async () =>{
        await axios(`${process.env.REACT_APP_API}api/getAllItems`, {
          headers: { authorization: getToken()}
        }).then((res)=>steProducts(res.data));
      }
      getItems()
      if(search === ''){
       (async ()=>{
        const selectedItems = await axios(`${process.env.REACT_APP_API}api/getShop`, {
          params: { shopId },
          headers: { authorization: getToken()}
        })
        const { data: { items } } = selectedItems;
        console.log(items, 'aaaa');
        if(!items) return setSeletedItems([]);
        setSeletedItems(items);
        console.log(items, 'items');
       })()
      }
  }, [render,search])

  useEffect(() => {
    console.log(products);
    products.map((el)=>{
      if(Number(search) === el.code) {
        setSeletedItems([el])
      }
    })
  }, [search])

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
  const searchHandler = (e) =>{
    setSearch(e.target.value)
  }
  return (
    <List dense sx={{ width: '100%' }}>
      <div style={{display: 'flex', paddingLeft: '15px', paddingRight: '15px', justifyContent: 'space-between'  }}>
      <Button variant='contained' onClick={getSelectedProduct}>{sleetedItems?.length ? 'Back to shop'  :'See All Selected Product'}</Button>
      {sleetedItems?.length  && <TextField id="outlined-basic" onChange={(e)=>searchHandler(e)} label="Search" variant="outlined" />}
      </div>
      {sleetedItems?.length===0 && products?.length && products.map((value) => {
        const { name, price, itemId, code } = value;
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
              <ListItemText id={labelId} primary={code} />
              <div style={{ display: 'flex' }}>
              <TextField id="outlined-basic"  label="Count" onClick={(e)=>setCount(e.target.value)} onChange={(e)=>setCount(e.target.value)} variant="outlined" />
              <Button variant='outlined' onClick={(e) => addList(e, itemId, price)}> + </Button>
              </div>
            </ListItemButton>
          </ListItem>
        );
      })}
      {
        sleetedItems?.length > 0 && sleetedItems.map((item)=> {
            return <ListItem>
              <ListItemText id={item.id} primary={item.name} />
              <ListItemText id={item.id} primary={item.count} />
              <ListItemText id={item.id} primary={item.code} />
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