import React from "react";
import Button from '@mui/material/Button'
import './form.css'
import FaceRecognition from "../FaceRecognition.js/FaceRecognition";


function ImageLinkForm({onInputChange, onButtonSubmit, imageUrl, box}){
    return(
    <>
        <div style={{display: 'grid', placeContent: " center", minHeight: '50vh', justifyContent: 'center'}}>
            {/* <p style={{maxHeight: '50px', textAlign: 'center', color:"black"}}>Paste link below to detect face</p> */}
            <div className="form">
                <input type='text' style={{ margin:"10px", width: '500px', height: '20px', borderRadius:'5px', border:'none'}} placeholder="Paste link below to detect face" onChange={onInputChange}/>
                <Button variant="contained" size="small" onClick={onButtonSubmit}>
                   Detect
                </Button>
            </div>
            <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>  
     </>  
    )
}

export default ImageLinkForm;