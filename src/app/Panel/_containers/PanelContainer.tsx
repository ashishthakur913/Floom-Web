import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Panel from '../_components/Panel'
import { AddFlower, UploadImage } from '../_actions/PanelActions'
import FlowerStore from '../../Flower/_stores/FlowerStore'

const mapStateToProps = (store:any) => ({
	uploadedImageUrl: store.getIn(['panel', 'uploadedImageUrl']),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	addFlower: (flower: FlowerStore) => dispatch(AddFlower(flower)),
	uploadImage: (fd: FormData) => dispatch(UploadImage(fd)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Panel);