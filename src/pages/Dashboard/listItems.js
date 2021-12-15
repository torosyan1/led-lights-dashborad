import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import StoreIcon from '@mui/icons-material/Store';
import { map } from 'lodash';
import { Link } from '@mui/material';

const list = [{name: 'Stories', icon: <StoreIcon />, href: '/dashboard/stories' }, {name: 'Products', icon: <ProductionQuantityLimitsIcon />, href: '/dashboard/products'}];

export const mainListItems = (
  <div>
      {map(list, (elem, index)=>{
          return (
            <ListItem key={index} button>
            <ListItemIcon>
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
