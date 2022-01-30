import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import getToken from '../../utils/getToken';
import axios from 'axios';

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
  const [price, setPrice] = useState();
  const [count, setCount] = useState();
  const [code, setCode] = useState();
  const [image, setImage] = useState();
  
  const handleClose = () =>{ 
    setOpen(false)
    setOpen(false)
    setIsEditProduct([])
  };

  const createItem = useCallback(async () => {
    if (isEditProduct.length) {
      console.log('llll')
      await axios(`${process.env.REACT_APP_API}api/updateItem`, {
        method: 'patch',
        data: {
          name,
          price: Number(price) || isEditProduct[1],
          count,
          code,
          itemId: isEditProduct[0]
        },
        headers: {
          authorization: getToken(),
        }
      });
      setIsEditProduct([])
    } else {
     const items = await axios(`${process.env.REACT_APP_API}api/createItem`, {
        method: 'post',
        data: {
          name,
          price: Number(price),
          count,
          code,
        },
        headers: {
          authorization: getToken(),
        }
      });
      const { data } = items
      await axios(`${process.env.REACT_APP_API}api/uploadImage`,{
        method: 'post',
        data: {
          itemId: data?.itemId
        },
        headers: {
          authorization: getToken(),
        }
      })
    }
    setOpen(false)
    setRender(price)
  },[code, count, isEditProduct, name, price, setIsEditProduct, setOpen, setRender])

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
          <TextField onChange={(e) => setPrice(e.target.value)} id="outlined-basic" label="Price" variant="standard" />
          <TextField onChange={(e) => setCount(e.target.value)} id="outlined-basic" label="Count" variant="standard" />
          <TextField onChange={(e) => setCode(e.target.value)} id="outlined-basic" label="Code" variant="standard" />
          <Button onClick={createItem}>{!isEditProduct.length ? 'Create Product' : 'Edit Product'}</Button>
        </Box>
      </Modal>
    </div>
  );
}