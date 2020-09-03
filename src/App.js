import React from 'react';
import './App.css';
import Clarifai from 'clarifai';
import SignIn from './components/signin/SignIn';
import Register from './components/Register/Register'
import Navigation from './components/Navigation';
import AddPicture from './components/AddPicture';
import Rank from './components/Rank';
import FaceRecogination from './components/FaceRecogination';
import Logo from './components/Logo';
import Particles from 'react-particles-js';




const ParticlesOptions = {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 550
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}


const app = new Clarifai.App({
  apiKey: 'a6ff9538713d496ebd67961b10e97be5'
});

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      input: '',
      image: '',
      box: {},
      route: 'signin',
      IsSignedIn: 'false'

    }

  }

  componentDidMount(){
    fetch('/')
    .then(response=> response.json())
    .then(data=> console.log(data))
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }
  displayFaceBox = (box) => {
    console.log(box);
    return this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
    this.setState({
      input: ''
    })

    console.log(event.target.value)
  }



  onButtonSubmit = (e) => {
    this.setState({
      image: this.state.input
    })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)

      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))


  }
  onroutechange = (route) => {
    if (route === 'signout') {
      this.setState({ IsSignedIn: false })
    }
    else if (route === 'home') {
      this.setState({ IsSignedIn: true })
    }
    this.setState({ route: route })
    console.log(route);
  }

  render() {
    return (
      < div className="App">
        <Particles className="particles"
          params={ParticlesOptions}
        />
        <Navigation IsSignedIn={this.IsSignedIn} onroutechange={this.onroutechange} />

        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank />
            <AddPicture

              onButtonSubmit={this.onButtonSubmit}
              onInputChange={this.onInputChange} />

            <FaceRecogination box={this.state.box} imageurl={this.state.image} />
          </div> : (
            this.state.route === 'signin' ?
              <SignIn onroutechange={this.onroutechange} /> :
              <Register onroutechange={this.onroutechange} />

          )


        }
      </ div>
    );
  }
}

export default App;
