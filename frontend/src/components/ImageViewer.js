import React from "react";
import "./ImageViewer.css";

const ImageViewer = ({ item, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{item.name}</h2>
                {item.image_url && <img src={item.image_url} alt={item.name} />}
                <p><strong>Descripción:</strong> {item.description || "No disponible"}</p>
            </div>
        </div>
    );
};

export default ImageViewer;
