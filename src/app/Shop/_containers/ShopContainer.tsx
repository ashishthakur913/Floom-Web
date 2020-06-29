import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Shop from '../_components/Shop'
import { FetchFlowers } from '../_actions/ShopActions'

const mapStateToProps = (store:any) => ({
	flowers: store.getIn(['shop', 'flowers']),
});

const mapDispatchToProps = (dispatch:Dispatch) => ({
	fetchFlowers: () => dispatch(FetchFlowers())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Shop);