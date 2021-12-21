import React, { Fragment } from 'react';  
import LongTermModal from './LongTermModal';  
import { IoMdAddCircle } from "react-icons/io";
import './LongTerm.css'
  
class LongTerm extends React.Component {  
  constructor() {  
    super();  
    this.state = {  
      showModalPopup: false  
    }  
  }  
  isShowPopup = (status) => {  
    this.setState({ showModalPopup: status });  
  };  
  render() {  
    return (  
      <Fragment>  
       
        <header align="right" className='add-button'>  
          <Fragment>  
            <div  
              className="nav-item"  
              >  
              < IoMdAddCircle className='add-circle-btn'  onClick={() => this.isShowPopup(true)} size="2.5rem" color="rgb(19, 179, 179)"/>  
            </div>  
          </Fragment>  
        </header>  
        <LongTermModal  
          showModalPopup={this.state.showModalPopup}  
          onPopupClose={this.isShowPopup}  
        ></LongTermModal>  
      </Fragment>  
    )  
  }  
}  
  
export default LongTerm;