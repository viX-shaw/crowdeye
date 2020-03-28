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
    idx: null,
    sampleImageURLs: ['https://drive.google.com/uc?id=1IyVHYIGVz7ENggzYh3tn6OrbjqXzwloj',
                      'https://drive.google.com/uc?id=1VbIKLM0JT4SFO5d-sDXYNa0JbcFCm-gk',
                      'https://drive.google.com/uc?id=1e7LErL-c78sCsa3y9Rd_wpD4T4MiaiKn',
                      'https://drive.google.com/uc?id=1_BTB34MS6AAX3bjy91b6Gfvx2E08w4qn',
                    'https://drive.google.com/uc?id=1IDjIhH5HZrnR32JT_TeUtmhib1KaWp4I',
                    'https://drive.google.com/uc?id=1JHSOV-3cDjyl5c2c_QmX7ZhZYkS0wKi0',
                    'https://drive.google.com/uc?id=1DBB0m96_5CN3cjEBRK4nS137jj85XMvI',
                    'https://drive.google.com/uc?id=1GZMRR0wts4a6Y7BZ0THVZDEUlUodrgeU',
                    'https://drive.google.com/uc?id=1t9P7DCu3_PvWLDlljisN64yOGEf_dFkM',
                    'https://drive.google.com/uc?id=1YS_Vu19SinBZeF5MO9j0NtLkXkD7dafm']

  }

  fetchdata = (formdata, idx)=> {
    this.setState({ uploading: true, idx: idx })
    console.log(typeof(formdata) == "string")
    console.log(formdata)
    if (typeof(formdata) == "string"){
      formdata = JSON.stringify({"url": formdata})
    }

    const myRequest = new Request('/classify', {
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
          return <img src={this.state.image} alt='' style={{ maxWidth: "100%",width:400}}/>
        default:
          return <div><h6></h6></div>
      }
    }

    return (
      <div>
        <div style={{ flex: 1, padding: 5, justifyContent: "center" }}>
          <h1 style={{marginBottom:5}}>CuMA</h1>
	    <h6 style={{marginTop: 3}}>Curfew Monitoring Assistant</h6>
        </div>
        {/* <div className="container"> */}
        <div style={{flex: "50%", backgroundColor: "green"}}>
            {
              !this.state.image ?
              <h2 style={{color: "white", padding: 20,textAlign: "center"}}>Select an Image from the list below</h2>
              :
              <h2 style={{color: "white", padding: 20}}>Result</h2>
            }
            <div style={{display: "flex", justifyContent: "center", padding: 10}}>
              {content()}
            </div>
          </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ flex: "50%", padding: 10}}>
            <h2>Test on Sample Images</h2>
              {
                this.state.sampleImageURLs.map((imgpath, idx) =>{
                  if(this.state.idx === idx){
                    const style = {padding: 5, cursor:"pointer", width:100, height:100, border: '1px solid #021a40'} 
                    return <img src={imgpath} alt='' onClick={()=>this.fetchdata(imgpath, idx)} style={style}/>
                  }else{
                    const style = {padding: 5, cursor:"pointer", width:100, height:100} 
                    return <img src={imgpath} alt='' onClick={()=>this.fetchdata(imgpath, idx)} style={style}/>
                  }
                })
              }
            {/* <h3 style={{paddingLeft: 30}}>or</h3> */}
            {/* <h2>Upload Image</h2>
            <div className='buttons'>
              <Buttons onChange={this.onChange} />
            </div> */}
          </div>
          
          {/* <p style={{backgroundColor: "green"}}>asdvvnjdfv sdfdfk</p> */}
        </div>
      </div>
      // </div>
    )
  }
}
