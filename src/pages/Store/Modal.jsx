import React, { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Checkbox, ListItem, TextField } from '@mui/material';
import getToken from '../../utils/getToken';
import axios from 'axios';
import { map } from 'lodash';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, setRender, setIsEditProduct, isEditProduct }) {
  const [name, setName] = useState();
  const [address, setAdres] = useState();
  const [description, setDescription] = useState();
  const [items, setItems] = useState();
  const [products, steProducts] =useState();
  const [checked, setChecked] = useState([]);
   console.log(products, checked);
  const handleClose = () =>{ 
    setOpen(false)
    setOpen(false)
    setIsEditProduct([])
  };
  useEffect(()=>{
    const getItems = () =>{
      axios(`${process.env.REACT_APP_API}api/getAllItems`, {
        headers: { authorization: getToken()}
      }).then((res)=>steProducts(res.data));
    }
    getItems()
  }, [])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const createItem = useCallback(async () => {
    if (isEditProduct?.length) {
      await axios(`${process.env.REACT_APP_API}api/createShop`, {
        method: 'patch',
        data: {
          name,
          address,
          description,
          items: checked,
        },
        headers: {
          authorization: getToken(),
        }
      });
      setIsEditProduct([])
    } else {
      await axios(`${process.env.REACT_APP_API}api/createShop`, {
        method: 'post',
        data: {
          name,
          address,
          description,
          items: checked,
        },
        headers: {
          authorization: getToken(),
        }
      });
    }
    setOpen(false)
    setRender(5)
  },[address, checked, description, isEditProduct?.length, name, setIsEditProduct, setOpen, setRender])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="standard" />
          <TextField onChange={(e) => setAdres(e.target.value)} id="outlined-basic" label="Address" variant="standard" />
          <TextField onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="description" variant="standard" />
          <Button onClick={createItem}>{!isEditProduct?.length ? 'Create Shop' : 'Edit Product'}</Button>
        </Box>
      </Modal>
    </div>
  );
}