import React from "react";
import './face.css'

function FaceRecognition({imageUrl, box}){
    
    

   
    return(
        <>
            <div className="image">
                <div className="relative">
                    <img id="inputimage" src={imageUrl} width='500px' height='auto' alt=""/>
                    <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                </div>
            </div>
        </>
    )
}

export default FaceRecognition;