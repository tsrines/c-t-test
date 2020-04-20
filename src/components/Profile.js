import React from 'react'
import clsx from 'clsx';
import FormGroup from '@material-ui/core/FormGroup';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddPhotoAlternateRoundedIcon from '@material-ui/icons/AddPhotoAlternateRounded';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DraftsIcon from '@material-ui/icons/Drafts';
import DevicesIcon from '@material-ui/icons/Devices';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

export default function Profile(props) {

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Avatar className={classes.medium} />
      <List>
        <ListItem>
          <ListItemIcon>< AccountCircleIcon /></ListItemIcon>
          <ListItemText primary="Account Settings" />
        </ListItem>
        <ListItem>
          <ListItemIcon>< DevicesIcon /></ListItemIcon>
          <ListItemText primary="Paired Devices" />
        </ListItem>
        <ListItem>
          <ListItemIcon><DraftsIcon /></ListItemIcon>
          <ListItemText primary="Invites" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button >
          <ListItemIcon><PlaylistAddCheckIcon /></ListItemIcon>
          <ListItemText primary="Triggers" />
        </ListItem>
        <ListItem button >
          <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        '& > *': {
          margin: theme.spacing(2),
          width: '50ch',
          flexGrow: 1
        },
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
      large: {
        flexGrow: 1,
        alignSelf: 'center',
        width: theme.spacing(15),
        height: theme.spacing(15),
      },
      toolbar: {
        minHeight: 128,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        alignSelf: 'flex-begin',
      },
    }),
  );
  // const [state, setState] = React.useState({
  //   checked: true
  // });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const classes = useStyles();

  console.log(props)
  return (
    <React.Fragment>
      <div className="App">
        <div className={classes.root}>
          <AppBar className="AppBar" position="static">

            <Toolbar className={classes.toolbar}>
              <IconButton
                onClick={toggleDrawer('left', true)}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <IconButton aria-label="display more actions"  color="inherit">
                <MoreIcon />
              </IconButton>
            </Toolbar>
            <div className="Avatar">
              <Avatar className={classes.large} /><AddPhotoAlternateRoundedIcon />
            </div>
            <Typography className={classes.title} variant="h6" >
              {props.state.currentUser.user_name}
            </Typography>
          </AppBar>
        </div>




        
        <div>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>



        <form onSubmit={props.onSubmit} className={"App" && classes.root} noValidate autoComplete="on">
          <TextField name="user_name" disabled value={props.state.currentUser.user_name} onChange={e => props.onChange(e)} id="standard-basic" placeholder="Name" />
          <TextField name="user_phone" disabled value={props.state.currentUser.user_phone} onChange={e => props.onChange(e)} id="standard-basic" placeholder="Phone Number" />
          <TextField name="user_email" disabled value={props.state.currentUser.user_email} onChange={e => props.onChange(e)} id="standard-basic" placeholder="E-mail" />
          <TextField disabled name="password" value={props.password} onChange={e => props.onChange(e)} id="standard-basic" placeholder="Password" type="password" />
          <TextField disabled name="pin" value={props.state.currentUser.user_pin} onChange={e => props.onChange(e)} id="standard-basic" placeholder="ACCESS PIN">{props.state.currentUser.pin}</TextField>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={props.state.checked}
                  onChange={e => props.handleChange(e)}
                  name="pairing"
                  color="primary"
                  labelplacement="end"
                // value={props.state.checked}
                />
              }
              label="ENABLE PAIRING"
            />
          </FormGroup>
          <Button disabled onClick={(e) => props.onSubmit(e)} variant="contained" color="primary">SAVE</Button>

        </form>
      </div>
    </React.Fragment>

  )

}


