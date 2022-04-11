// import React, { useState } from 'react';
import React, { createRef, useState } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import './style.css'
// import Toast from 'react-bootstrap/Toast';
import { jsPDF } from "jspdf";

// import Button from 'react-bootstrap/Button';
import ImageUploading from 'react-images-uploading';
// import { useScreenshot, createFileName } from "use-react-screenshot";




const btnClick =()=>{
  const changes=document.querySelector('.form_check');
  const stuff=document.querySelector('.stuff');
  changes.innerHTML=`<p> ${stuff.value} </p>`

}


const Test = () => {

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  //new code

  const ref = createRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const download = (image, { name = "img", extension = "jpeg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    console.log(image);
    var imgData = image;
    var doc = new jsPDF("p", "mm");
    var imgWidth = 210;
    var pageHeight = 297;
    var imgHeight =
      (doc.getImageProperties(image).height * imgWidth) /
      doc.getImageProperties(image).width;

    var position = 0;
    var heightLeft = imgHeight; // give some top padding to first page
    doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    console.log(imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      console.log(heightLeft);

      position -= 297;
      // console.log(position)
      // top padding for other pages
      doc.addPage();
      doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    doc.save("Whatsapp Report.pdf");

    // pdf.output('dataurlnewwindow');
    // pdf.save("download.pdf");
    // a.download = createFileName(extension, name);
    // a.click();
  };

const getImage = () => {

  takeScreenshot(ref.current)
    .then(download)
    .then(() => {
      console.log(ref.current);
      //   chatPrev.style.height="750px";
      // chats.style.height="660px";
    });
};





  //

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

    return (
        <div>
          
      <div>
      <div>
        <button style={{ marginBottom: '10px' }} onClick={getImage}>
          Take screenshot
        </button>
      </div>
      <img src={image} alt={'Screenshot'} />
      <div ref={ref}>
        <h1>use-react-screenshot</h1>
        <p>
          <strong>Hello there people we gonna make some screenshot to pdf</strong>
          <strong>Hello there people we gonna make some screenshot to pdf</strong>
          <strong>Hello there people we gonna make some screenshot to pdf</strong>
          <strong>Hello there people we gonna make some screenshot to pdf</strong>
        </p>
        <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      <div className="form_check">
        <form action="">
          <label htmlFor="">Enter Name</label>
          <input className='stuff' type="John Doe" />
          <button onClick={btnClick} >click me</button>
        </form>
      </div>
      </div>
      

    </div>
    <button onClick={getImage}>stuff</button>
    <div className='container'>
      <div className="filt"></div>
      {/* <input id="shit" placeholder='Enter Addressa' type="text" /> */}
      <textarea  id="shit" name="" placeholder='Enter text...'  ></textarea>
      </div>
      <section className="image1"></section>
      <section className="image2"></section>
      <section className="image3"></section>
    
        </div>
        
    );
}
 
export default Test;