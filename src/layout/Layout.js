import { useState } from 'react';
import { version } from '../../package.json';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
// actions
import { adminActions } from '../store/actions';
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AppBar from './AppBar';
import DrawerHeader from './DrawerHeader';
import Main from './Main';
import { get } from 'lodash';
import { DynamicMui } from '../common';
import Menu from './Menu';
// data
import routerData from '../data';

const drawerWidth = 240;

const Layout = props => {
  // hooks
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  // states
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  // func
  const handleClickSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
    dispatch(adminActions.changeSideBar(!sideBarIsOpen));
  };
  // router
  const routers = get(props, 'dynamicDefinition.routers', []);

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        handleClickSideBar={handleClickSideBar}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={sideBarIsOpen}
      >
        <DrawerHeader>
          <Typography
            variant='body2'
            color='inherit'
            fontSize='small'
            fontWeight={500}
          >
            {translate('title')}
          </Typography>
          <Typography
            variant='body2'
            color='inherit'
            fontSize='small'
            fontWeight={500}
          >
            {`v${version}`}
          </Typography>
        </DrawerHeader>
        <Divider />
        <Menu menuRouters={routerData} />
      </Drawer>
      <Main open={sideBarIsOpen}>
        <DrawerHeader />
        <Switch>
          {routers.map((item, index) => {
            return (
              <Route
                key={index}
                exact={item.exact}
                path={item.path}
                component={() => <DynamicMui componentDefinition={item.component} />}
              />
            )
          })}
          <Redirect from="*" to="/not-found" />
        </Switch>
      </Main>
    </Box>
  );
}

export default Layout;
