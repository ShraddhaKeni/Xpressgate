import React from "react";
import "./modal.css";
import PropTypes from "prop-types";

const Modal = () => {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

    return (
      <div class="modal" id="modal">
        <h2>Modal Window</h2>
        <div class="content">{this.props.children}</div>
        <div class="actions">
          <button class="toggle-button" onClick={this.onClose}>
            close
          </button>
        </div>
      </div>
    );
  
}

export default Modal

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};