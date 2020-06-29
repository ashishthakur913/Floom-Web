import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Header from '../_components/Header'

const mapStateToProps = (store:any) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);