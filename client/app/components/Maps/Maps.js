import React, { Component } from 'react';
import { Button, Image, ListGroup, ListGroupItem} from "react-bootstrap";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import 'whatwg-fetch';

class Maps extends Component {
	constructor(props) {
		super(props);
		this.state={
			continent : [],
			detail: [],
			mapi: '',
			setDetail : false
		}	

		this.getDetail = this.getDetail.bind(this);
	}

	getDetail(det){
		fetch('/api/account/detail?det='+det)
			.then(res => res.json())
			.then(json => {
				console.log(json.detail)
				let detail = []
				this.setState({setDetail: true})
				this.setState({mapi: '/assets/img/'+det.toLowerCase()+'.svg'})
        		this.setState({detail: json.detail.map(item => {return <ListGroupItem>
																{item.POBLACION} - 
																<p>{item.ANCESTRIA} %
																</p>
															  </ListGroupItem>
															  })})

			})
	}

	componentWillMount() {  
		fetch('/api/account/continent')
			.then(res => res.json())
        	.then(json => {
        		let continent = []
        		
        		this.setState({continent: json.continent.map(item => {return <ListGroupItem>
        																		{item._id.loc} - 
        																		<p>{item._id.pr} %
        																		</p>
        																		<Button onClick={() => this.getDetail(item._id.loc)}>
        																	    	detalles
        																	  	</Button>
        																	  </ListGroupItem>
        																	  })})

  
        });
	}


render(){
		const {
			continent,
			detail,
			setDetail,
			mapi
		} = this.state
	if(!setDetail){	
	return (	
		<div>
		<Container>
				<Col>  	
					<ListGroup>
	    				{continent}
  					</ListGroup>
  				</Col>
				<Col><Image src="/assets/img/base.svg" fluid /></Col>
		</Container>
		</div>
      );} else {
      	return(<div>
		<Container>
				<Col>  	
					<ListGroup>
	    				{detail}
  					</ListGroup>
  				</Col>
				<Col><Image src="/assets/img/base.svg" fluid /></Col>
		</Container>
		</div>)
      }
	}
}
export default Maps;
//        <Image src="/assets/img/base.svg" fluid />


