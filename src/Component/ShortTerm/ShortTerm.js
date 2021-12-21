import React, { Fragment } from 'react';  
import ShortTermModal from './ShortTermModal';  
import { IoMdAddCircle } from "react-icons/io";
import './ShortTerm.css'
  
class ShortTerm extends React.Component {  
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
        <ShortTermModal  
          showModalPopup={this.state.showModalPopup}  
          onPopupClose={this.isShowPopup}  
        ></ShortTermModal>  
      </Fragment>  
    )  
  }  
}  
  
export default ShortTerm;