import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MaterialLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GoogleIcon from './GoogleIcon';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    backgroundColor: 'inherit',
    boxShadow: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  iconButton: {
    marginLeft: 'auto',
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>
        <IconButton edge='start' color='inherit' aria-label='home'>
          <Link to='/'>
            <span role='img' aria-label='home-emoji'>
              &#127968;
            </span>
          </Link>
        </IconButton>
        <div className={classes.iconButton}>
          {!!props.auth && (
            <Link to='/new-post'>
              <Button
                variant='contained'
                color='primary'
                size='small'
                startIcon={<PostAddIcon />}
              >
                Add a new Post
              </Button>
            </Link>
          )}
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            <GoogleIcon />
          </IconButton>
          {props.auth !== null ? (
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {!!props.auth ? (
                <MenuItem onClick={handleClose}>
                  <MaterialLink href='/api/logout'>Logout</MaterialLink>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleClose}>
                  <MaterialLink href='/auth/google'>Login</MaterialLink>
                </MenuItem>
              )}
            </Menu>
          ) : null}
        </div>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Header);
