import React, { Component } from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition'
import SignIn from '../components/SignIn/SignIn'
import Register from '../components/Register/Register'
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 25,
      density: {
        enable: true,
        value_area: 125
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''  
  }     
}

const heroku = 'https://nameless-oasis-61801.herokuapp.com';


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  

  calculateFaceLocation = (data) => {
    const clarifaiFace = data['outputs'][0]['data']['regions'][0]['region_info']['bounding_box'];
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(`${heroku}/imageurl`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response !== 'unable to work with api') {
        fetch(`${heroku}/image`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
        .catch(console.log);
        this.displayFaceBox(this.calculateFaceLocation(response));
        document.getElementById('errorPrompt').innerHTML = '';
      } else {
        document.getElementById('errorPrompt').innerHTML = 'Invalid image link. JPG image links only';
      }
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route  === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({ route: route });
  }

  render() {
    return (
      <div className='App'>
        <Particles
          className='particles'
          params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {
          this.state.route === 'home' ?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
            </div> :
            (
              this.state.route === 'signin' || this.state.route === 'signout' ?
                <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} heroku={heroku} /> :
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} heroku={heroku} />
            )
        }
      </div>
    )
  }
}

export default App;