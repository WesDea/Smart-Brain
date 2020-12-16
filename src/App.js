import React, { Component, Fragment } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register'
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';






const particlesOptions = {
    particles: {
      number:{
        value:90,
        density:{
          enable: true,
          value_area: 800
        },
      },
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        }
      }
    }
  }

//default state that loads everytime a fresh request is sent through
const initialState = {
  input: '',
  imageUrl: '',
      box: {},
  route: 'signin',
  isSignedIn: false,
  error: false,
  errorMessage: '',
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
      }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  // updates state with user data
  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  //The function that the box outline for the face in the image.
  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
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

  //Updates the box state
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true});
    }else {
      this.setState(initialState);
    }
    this.setState({route: route});
  }

  onError = (err) => {
    this.setState({
        error: true,
        errorMessage: err,
    })
  }

  onSubmit = () =>{
    this.setState({ 
      imageUrl: this.state.input,
      error: false,
      errorMessage: ''
     });
     //verifies API and checks that input is valid
    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .catch(err => console.log(err))
    .then(response => response.json())
    .then(res =>{
      if (res.rawData){
        //Upadates the number of entries for the user
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .catch(err => console.log(err))
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        });
       //Sets the box state equal to the parameters returned by calculateFaceLocation.
        this.displayFaceBox(this.calculateFaceLocation(res));
      } else {
        this.onError(res)
      }
      
    });
    }
  

  //Update input state based on what is entered into the input box.
  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  //simple refresh function for when the icon is clicked.
  refreshPage = () => {
    window.location.reload(false);
  }

  render(){
    const { onInputChange, loadUser, onSubmit, onRouteChange, refreshPage } = this;
    const { error, errorMessage, isSignedIn, box, imageUrl, route, user } = this.state;
    return (
      <Fragment>
      <Particles className='particles'
                params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      {
        route === 'home'?
        <div>
          <Logo refreshPage={refreshPage}/>
          <Rank name={user.name} entries={user.entries}/>
          <ImageLinkForm error={error} errorMessage={errorMessage} onInputChange={onInputChange} onSubmit={onSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        :(route === 'register'?
        <div>
          <Logo refreshPage={refreshPage}/>
          <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
        </div>:
        <div>
          <Logo refreshPage={refreshPage}/>
          <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
        </div>
        )
      }
      
      
      </Fragment>
    );
  }
}

export default App;
