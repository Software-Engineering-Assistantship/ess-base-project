import React from 'react'

function Popup(props) {
  return (props.trigger) ? (
    <div classname="popup">
      <div className="popup-inner">
        <button className="close-button">Fechar</button>
        {props.children}
      </div>
    </div>
  ) : ""
}

export default Popup
