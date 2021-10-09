import {
  forwardRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// material ui
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  ListItemButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// router dom
import { DynamicMuiIcon } from '../common';
import NavLinkRef from './NavLinkRef';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(
  theme => ({
    root: {
      color: theme.palette.text.secondary,
    },
    selected: {
      background: 'rgb(0 0 0 / 12%) !important',
      color: '#fff'
    },
    leftIcon: { minWidth: theme.spacing(5) },
  }),
);

const MenuItemHelper = forwardRef((props, ref) => {
  const {
    classes: classesOverride,
    className,
    primaryText,
    leftIcon,
    onClick,
    tooltipProps,
    ...rest
  } = props;

  // hooks
  const classes = useStyles(props);
  const location = useLocation();
  // func
  const handleMenuTap = useCallback(
    e => onClick && onClick(e),
    [onClick]
  );

  const renderMenuItem = () => {
    return (
      <ListItemButton
        className={classnames(classes.root, className)}
        component={NavLinkRef}
        ref={ref}
        tabIndex={0}
        {...rest}
        onClick={handleMenuTap}
        sx={{
          py: 0,
          minHeight: 32,
        }}
        classes={{
          selected: classes.selected
        }}
        selected={props.to.pathname === location.pathname}
      >
        {leftIcon ? (
          <ListItemIcon className={classes.leftIcon}>
            <DynamicMuiIcon icon={leftIcon} />
          </ListItemIcon>
        ) : (
            <ListItemIcon className={classes.leftIcon} />
          )
        }
        <ListItemText
          primary={primaryText}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: 'medium',
            marginLeft: !leftIcon ? '16px' : '0px'
          }}
        />
      </ListItemButton>
    );
  };

  return (
    <Tooltip title={primaryText} placement="right" {...tooltipProps}>
      {renderMenuItem()}
    </Tooltip>
  )
});

MenuItemHelper.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  leftIcon: PropTypes.string,
  onClick: PropTypes.func,
  primaryText: PropTypes.node,
  staticContext: PropTypes.object,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  sidebarIsOpen: PropTypes.bool,
};

export default MenuItemHelper;