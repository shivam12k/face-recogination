import React from 'react'
const AddPicture = ({ onButtonSubmit, onInputChange, onDelete }) => {
    return (
        <div >


            <p className="f3 center node decoration">
                {"this magic website will detect faces in image. give it try"}
            </p>

            <div className=" pa4 br3 shadow-5  center searchbox">

                <input type='text'
                    placeholder='Enter the link of image'
                    className="f4 pa2 w-70 centre "
                    onChange={onInputChange} />
              
                <button
                    className=" grow mv1 btn f4 link ph3 dib white"
                    onClick={onButtonSubmit}
                   
                >ok</button>
                {/* <button className=" grow btn" onClick={onDelete}><i className="fa fa-trash "></i></button> */}


            </div>

        </div>
    );
}

export default AddPicture;