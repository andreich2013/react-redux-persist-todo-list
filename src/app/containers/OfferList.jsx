import { connect } from 'react-redux'
import * as actions from '../actions'
import OfferList from '../components/OfferList.jsx'

const mapStateToProps = (state) => {
  const { list } = state.offer;
  
  return {
    list
  };
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(OfferList);