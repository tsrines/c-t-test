import React from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


export default function Register(props) {

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
      small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
      large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
      }
    }),
  );
  // const [state, setState] = React.useState({
  //   checked: true
  // });

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="App">

        <Avatar alt="" src="" className={classes.root && classes.large}>Pairing App</Avatar>

        <form onSubmit={props.onSubmit} className={classes.root} noValidate autoComplete="on">
          <TextField name="user_name" value={props.user_name} onChange={e => props.onChange(e)} id="standard-basic" placeholder="Name" />
          <TextField name="user_phone" value={props.user_phone} onChange={e => props.onChange(e)} id="standard-basic" placeholder="Phone Number" />
          <TextField name="user_email" value={props.user_email} onChange={e => props.onChange(e)} id="standard-basic" placeholder="E-mail" />
          <TextField name="password" value={props.password} onChange={e => props.onChange(e)} id="standard-basic" placeholder="Password" type="password" />
          <TextField name="password2" value={props.password2} onChange={e => props.onChange(e)} id="standard-basic" placeholder="Password Confirmation" type="password" />
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
          <Button onClick={(e) => props.onSubmit(e)} variant="contained" color="primary">REGISTER</Button>
        </form>
      </div>
    </React.Fragment>
  )
}


