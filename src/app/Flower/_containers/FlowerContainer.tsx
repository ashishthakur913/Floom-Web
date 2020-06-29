import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Flower from '../_components/Flower'

const mapStateToProps = (store:any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Flower);