import React, { useState } from 'react';
import './Editor.css';

const App = () => {
  const [elements, setElements] = useState([]);

  const handleDrop = (element) => {
    setElements([...elements, element]);
  };

  const handleDelete = (index) => {
    const newElements = [...elements];
    newElements.splice(index, 1);
    setElements(newElements);
  };

  return (
    <div>
    <div className="main">Simple Editor</div>
    <div className="editor">
      <div className="sidebar">
        <div className="element" draggable onDragStart={() => handleDrop('Text')}>
          Text
        </div>
        <div className="element" draggable onDragStart={() => handleDrop('Image')}>
          Image
        </div>
      </div>
      <div className="workspace">
        {elements.map((element, index) => {
          if (element === 'Text') {
            return <Text key={index} index={index} handleDelete={handleDelete} />;
          } else if (element === 'Image') {
            return <Image key={index} index={index} handleDelete={handleDelete} />;
          }
        })}
      </div>
    </div>
    </div>
    
  );
};

const Text = ({ index, handleDelete }) => {
  const [text, setText] = useState('');

  return (
    <div className="text-element">

      <textarea className="text-area" onChange={(e) => setText(e.target.value)} />
      <p className="text-area">{text}</p>
      <button className="delete-button" onClick={() => handleDelete(index)}>
        Delete
      </button>
    </div>
  );
};

const Image = ({ index, handleDelete }) => {
  const [image, setImage] = useState(null);

  const handleImageLoad = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="image-element">
      {image ? (
        <img className="image-preview" src={URL.createObjectURL(image)} alt="Preview" />
      ) : (
        <div className="image-placeholder" onClick={() => document.getElementById(`image-upload-${index}`).click()}>
         Click to Upload Image
        </div>
      )}
      <input id={`image-upload-${index}`} type="file" onChange={handleImageLoad} style={{ display: 'none' }} />
      <button className="delete-button" onClick={() => handleDelete(index)}>
        Delete
      </button>
    </div>
  );
};

export default App;
