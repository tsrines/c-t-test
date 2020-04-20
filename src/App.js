import React, { Fragment } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import Register from './components/Register'
import Profile from './components/Profile'
import Landing from './components/Landing'
import './App.css';

class App extends React.Component {

  state = {
    currentUser: {
      msg: "user created",
      user_id: 157,
      user_name: "Testerrrr",
      user_phone: "4324324321",
      user_email: "steve@jobs.com",
      user_pin: "6239",
      pairing: true,
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90YWdzaG9wLmNvIiwiYXVkIjoiXCJUZXN0ZXJycnJcIiIsImV4cCI6IjE1ODczNjE3NjgiLCJ1c2VyX2lkIjoiMTU3IiwidXNlcl9waW4iOiI2MjM5In0.woMUSGXaeiOUUFUewcL4McppPLTOAuBglAHH7h2LDcc"
    },
    user_name: "",
    user_email: "",
    user_phone: "",
    pairing: false,
    warning: false,
    isLoggedIn: false
  }

  componentDidMount() {

  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };


  createUser = () => {
    const { user_name, user_email, user_phone, pairing } = this.state
    const formdata = new FormData();
    formdata.append("user_name", `${user_name}`);
    formdata.append("user_email", `${user_email}`);
    formdata.append("user_phone", `${user_phone}`);
    formdata.append("pairing", `${pairing}`);

    var requestOptions = {
      method: 'POST',
      body: formdata
    };

    fetch("http://projects.codeandtrust.com/api/user/create", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("result in create fetch before currentUser setState", result)
        this.setState({
          currentUser: result.data
        }, () => {

          // console.log("in create callback after setstate before this.getUser, this.state.currentUser.id",this.state.currentUser.id)
          try {
            this.getUser(result.data.user_id)
          } catch (err) {
            console.error(err.msg, err.err);

          }

        })
      }).catch(error => console.log('error', error.message));
  }

  getUser = (id) => {
    fetch(`http://projects.codeandtrust.com/api/user/${id}`)
      .then(response => response.json())
      .then(result => {

        console.log("result coming from getUser", result[0])
        this.props.history.push(`user/${result[0].id}`)
        this.setState({
          ...this.state,
          showPageUser: result[0]
        })
      })
      .catch(error => console.log('error', error));
  }

  // {"msg":"user created","data":{"msg":"user created","user_id":"173","user_name":"sdfdsf","user_phone":"123123123","user_email":"123","user_pin":"8365","pairing":"false","token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90YWdzaG9wLmNvIiwiYXVkIjoic2RmZHNmIiwiZXhwIjoiMTU4NzQxMTE5NSIsInVzZXJfaWQiOiIxNzMiLCJ1c2VyX3BpbiI6IjgzNjUifQ.r0o1Af1A9tWqpPIm-Z5sIR_zn4Wlvu_sJ2k5wVJiizg"}}

  onSubmit = (e) => {
    const { password, password2 } = this.state
    e.preventDefault()
    if (password === password2) {
      this.createUser()
    }

  }

 

  render() {
    console.log(this.state)
    return (

      <Switch>
        {/* <Route exact path='/'render={routerProps => <Landing {...routerProps}/>}/> */}
        <Route exact path='/' render={routerProps => <Register onSubmit={this.onSubmit} state={this.state} handleChange={this.handleChange} onChange={this.onChange} {...routerProps} />} />
        <Route exact path='/user/:id' render={routerProps => <Profile onSubmit={this.onSubmit} state={this.state} handleChange={this.handleChange} onChange={this.onChange} {...routerProps} />} />
      </Switch>
    )
  }
}

export default withRouter(App);
