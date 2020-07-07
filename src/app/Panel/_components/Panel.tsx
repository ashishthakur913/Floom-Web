import * as React from 'react';
import ImageUploader from 'react-images-upload';

export type Props = {
	addFlower?: Function
	uploadImage?: Function
	uploadedImageUrl?: string
};

type State = {
	name: string
	rating: string
	price: string
	image: object
	imageUploadError: boolean
	formSubmitSuccess: boolean
}

const initialState = {
	name: "",
	rating: "1",
	price: "",
	imageUploadError: false,
	formSubmitSuccess: false
};

export default class Class extends React.Component<Props> {
	private form:React.RefObject<any>;
	constructor(props){
		super(props);
        this.form = React.createRef();
        this.onDrop = this.onDrop.bind(this);
	}

	state = initialState as State


    private changeName(e) {
        let value = e.target.value;
        this.setState({name:value})
    }

    private changePrice(e) {
        let value = e.target.value;
        this.setState({price:value})
    }

    private changeRating(e) {
        let value = e.target.value;
        this.setState({rating:value})
    }
    private addFlowerSubmit(e) {
        e.preventDefault();
        let {uploadedImageUrl} = this.props;
        if (this.form.current.reportValidity()) {
        	let {name, price, rating} = this.state;
            let flower = {
            	name: name,
            	price: price,
            	rating: rating,
            	image_url: uploadedImageUrl,
            }
            this.props.addFlower(flower)
            this.setState(initialState);
            this.setState({formSubmitSuccess: true})
            setTimeout(() => this.setState({formSubmitSuccess: false}), 1000)
        }
        if (!uploadedImageUrl) {
			// Made image upload optional for now because of S3 upload issues
			// this.showImageUploadError()
        }
    }

    private showImageUploadError() {
    	this.setState({imageUploadError: true})
    }

    onDrop(picture) {
		let fd = new FormData();
		fd.append('file', picture[0]);
        this.props.uploadImage(fd)
    }

	render = () => {
		let uploadErrorClass = this.state.imageUploadError ? 'visible' : '';
		let formSubmitSuccessMsg = this.state.formSubmitSuccess ? 'visible' : '';
		return <div className="panel-container">
			<div className="add-form">
				<form ref={this.form} onSubmit={this.addFlowerSubmit.bind(this)} noValidate autoComplete="off">
					<div className="form-upload-field">
						<ImageUploader
						    withIcon={true}
						    buttonText='Select Image'
						    onChange={this.onDrop}
						    imgExtension={['.jpg', '.png']}
						    maxFileSize={5242880}
						    singleImage={true}
						/>
						<div className={"upload-error " + uploadErrorClass}>Please upload an image</div>
					</div>
				    <div className="form-field">
				        <label>Name</label>
				        <input
				        	onChange={(e:React.ChangeEvent<HTMLInputElement>) => this.changeName(e)}
				        	type="text"
				        	name="full-name"
				        	id="full-name"
				        	placeholder="Marigold"
				        	value={this.state.name}
				        	required 
				        />
				    </div>
				    <div className="form-field">
				        <label>Price</label>
				        <input
				        	onChange={(e:React.ChangeEvent<HTMLInputElement>) => this.changePrice(e)}
				        	type="number"
				        	name="price-input"
				        	id="price-input"
				        	placeholder="$"
				        	value={this.state.price}
				        	required
				        />
				    </div>
				    <div className="form-field">
				        <label>Rating</label>
						<select
							onChange={(e:React.ChangeEvent<HTMLSelectElement>) => this.changeRating(e)}
							name="rating"
							id="rating"
							value={this.state.rating}
						>
							<option value="1">1 star</option>
							<option value="2">2 star</option>
							<option value="3">3 star</option>
							<option value="4">4 star</option>
							<option value="5">5 star</option>
						</select>
				    </div>
				    <div className="form-field">
				        <label></label>
				        <input className="submit-btn" type="submit" value="Add Flower" />
				    </div>
				</form>
				<div className={"success-popup " + formSubmitSuccessMsg }>
					<div className="message">Flower Added</div>
				</div>
			</div>

    	</div>
	}
}