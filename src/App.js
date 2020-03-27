import React, { Component } from 'react'
import Spinner from './Components/Spinner'
// import Images from './Components/Images'
import Buttons from './Components/Buttons'
import placeholderImg from './Components/images.png'
// import { API_URL } from './config'
import './App.css'

export default class App extends Component {

  state = {
    uploading: false,
    image: null,
    sampleImageURLs: ['https://drive.google.com/uc?id=1IyVHYIGVz7ENggzYh3tn6OrbjqXzwloj',
                      'https://drive.google.com/uc?id=1VbIKLM0JT4SFO5d-sDXYNa0JbcFCm-gk',
                      'https://drive.google.com/uc?id=1e7LErL-c78sCsa3y9Rd_wpD4T4MiaiKn',
                      'https://drive.google.com/uc?id=1_BTB34MS6AAX3bjy91b6Gfvx2E08w4qn',
                    'https://drive.google.com/uc?id=1IDjIhH5HZrnR32JT_TeUtmhib1KaWp4I']
  }

  fetchdata = (formdata)=> {
    this.setState({ uploading: true })
    console.log(typeof(formdata) == "string")
    console.log(formdata)
    if (typeof(formdata) == "string"){
      formdata = JSON.stringify({"url": formdata})
    }

    const myRequest = new Request('https://7964db69.ngrok.io/classify', {
      method: 'POST',
      body: formdata,
      // cache: 'default',
    });
    fetch(myRequest)
      .then(res => res.blob())
      .then(image => {
        this.setState({
          uploading: false,
          image: URL.createObjectURL(image)
        })
      })
  }
  onChange = e => {
    const files = Array.from(e.target.files)
    console.log(files)

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    this.fetchdata(formData)
  }

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    })
  }

  render() {
    const { uploading, image } = this.state

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />
        case image !== null:
          return <img src={this.state.image} alt='' style={{height: 300}}/>
        default:
          return <img style={{opacity: 0.5}} src={placeholderImg} alt=''/>
      }
    }

    return (
      <div>
        <div style={{ flex: 1, padding: 5, justifyContent: "center" ,boxShadow: "0px 3px 10px 1px #9E9E9E"}}>
          <h1>CrowdEye</h1>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "50%", padding: 10}}>
            <h2>Test on Sample Images</h2>
              {
                this.state.sampleImageURLs.map(imgpath =>{
                  return <img src={imgpath} alt='' onClick={()=>this.fetchdata(imgpath)} style={{padding: 5, cursor:"pointer", width:100, height:100}}/>
                })
              }
            {/* <h3 style={{paddingLeft: 30}}>or</h3> */}
            <h2>Upload Image</h2>
            <div className='buttons'>
              <Buttons onChange={this.onChange} />
            </div>
          </div>
          <div style={{flex: "50%", backgroundColor: "green"}}>
            <h2 style={{color: "white", paddingLeft: 20}}>Result</h2>
            <div style={{display: "flex", justifyContent: "center", padding: 10}}>
              {content()}
            </div>
          </div>
          {/* <p style={{backgroundColor: "green"}}>asdvvnjdfv sdfdfk</p> */}
        </div>
      </div>
    )
  }
}