import { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createIcon } from '../../dynamic';
import NavLinkRef from './NavLinkRef';
import { useLocation } from 'react-router-dom';
// material ui
import {
  Tooltip,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  theme => ({
    root: {
      color: theme.palette.common.text,
      '&:hover': {
        color: theme.palette.text.primary,
        borderRadius: 10
      }
    },
    selected: {
      background: `${theme.palette.common.selected} !important`,
      color: theme.palette.text.primary,
      borderRadius: 10
    }
  }),
);

const MenuItemSingleHelper = forwardRef((props, ref) => {
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

  return (
    <Tooltip title={primaryText} placement="right" {...tooltipProps}>
      <ListItemButton
        className={classnames(classes.root, className)}
        component={NavLinkRef}
        ref={ref}
        tabIndex={0}
        {...rest}
        onClick={handleMenuTap}
        sx={{ px: 3 }}
        classes={{
          selected: classes.selected,
        }}
        selected={props.to.pathname === location.pathname}
      >
        <ListItemIcon sx={{ color: 'inherit' }}>
          {createIcon({ icon: leftIcon })}
        </ListItemIcon>
        <ListItemText
          primary={primaryText}
          primaryTypographyProps={{
            variant: 'subtitle2',
            fontWeight: 'medium',
            lineHeight: '1.5',
            mb: '2px',
          }}
          sx={{ my: 0 }}
        />
      </ListItemButton>
    </Tooltip>
  )
});

MenuItemSingleHelper.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  leftIcon: PropTypes.string,
  onClick: PropTypes.func,
  primaryText: PropTypes.node,
  staticContext: PropTypes.object,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default MenuItemSingleHelper;