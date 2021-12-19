import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LoginIcon from '@mui/icons-material/Login';
import StoreIcon from '@mui/icons-material/Store';
import { map } from 'lodash';
import { Link } from '@mui/material';

const list = [{name: 'Stories', icon: <StoreIcon />, href: '/dashboard/stories' }, {name: 'Products', icon: <ProductionQuantityLimitsIcon />, href: '/dashboard/products'}, {name: 'Log out', icon: <LoginIcon /> }];
const click = (href) => {
  console.log(href);
  if(href){ 
    window.location.href=href
  } else {
    localStorage.removeItem('token');
    window.location.href='/'
  }
}
export const mainListItems = (
  <div>
      {map(list, (elem, index)=>{
          return (
            <ListItem href={elem.href} key={index} button>
            <ListItemIcon onClick={() => click(elem.href)}>
              {elem.icon}
            </ListItemIcon>
            <Link href={elem.href}>
            <ListItemText primary={elem.name} />
            </Link>
          </ListItem>
          )
      })}
  </div>
);
