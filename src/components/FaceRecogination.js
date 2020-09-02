import React from 'react'
import './FaceRecogination.css'
const FaceRecogination = ({ box, imageurl }) => {
    return (<div className="decoration">
        <div className="absolute mt2 decoration" >
            <img alt=""
                src={imageurl}
                id="inputImage"
                width="500px" height="auto" />
            <div className="bounding-box"
                style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
            </div>
        </div>

    </div>);
}

export default FaceRecogination;
