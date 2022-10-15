
import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';
import SignIn from './Signin/SignIn';
import Register from './components/Register/Register';

const initialState ={
  input:'',
  imageUrl:'',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user:{
    id: '',
    name: '',
    email: '',
    password: '',
    joined: '' 
  }
} 

class App extends React.Component {

constructor(props){
  super(props);
  this.state = initialState;
  this.onInputChange =this.onInputChange.bind(this)
  this.onButtonSubmit =this.onButtonSubmit.bind(this)
  this.calculateFaceLocation = this.calculateFaceLocation.bind(this)
  this.faceBox = this.faceBox.bind(this)
  this.loadUser = this.loadUser.bind(this)
}

loadUser =(data) =>{
  this.setState({
    user:{
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      joined: data.joined
    }
  })
}


calculateFaceLocation = (data) => {
  const clarifaiFace = JSON.parse(data).outputs[0].data.regions[0]
   .region_info.bounding_box;
  const image = document.getElementById("inputimage");
  const width = Number(image.width);
  const height = Number(image.height);
  return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    }

}



faceBox = (x) =>{
  this.setState({
      box: x
   });
}



onInputChange =(event)=>{
this.setState({
  input: event.target.value
})
}
  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })
const raw = JSON.stringify({
  "user_app_id": {
      "user_id": "clarifai",
      "app_id": "main"
  },
"inputs": [
  {
    "data": {
      "image": {
        "url": `${this.state.input}`
      }
    }
  }
]
});

const requestOptions = {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Authorization': 'Key 9b3b0653c4bf4c48946bdd5e78984d89'
},
body: raw
};

fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", requestOptions)
.then(response => response.text())
.then(result => this.faceBox(this.calculateFaceLocation(result)))
.catch(error => console.log('error', error));

 }
 
 onRouteChange =(prop) =>{
  if(this.state.route ==='signin'||this.state.route ==='register'){
    this.setState({
      isSignedIn: true
    })
  }
  else if(this.state.route ==='home'){
    this.setState(initialState)
  }
    this.setState({
      route: prop
    })
  
 }
 
render(){
 const {isSignedIn, route, imageUrl, box} = this.state
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'signin' 
        ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        : route === 'register' ? 
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        : <>
        <h1 style={{textAlign: 'center', color:'white'}}> Hello {this.state.user.name}</h1>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} imageUrl={imageUrl} box={box} />
        <ParticlesBg type="cobweb" bg={true} />
          </>
        }
      </div>
    );

    
  }
  
}


export default App;


