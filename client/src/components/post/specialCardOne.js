import React, { Fragment } from 'react';
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'

const SpecialCardOne = ({specials}) => {
	return (
		<Fragment>
			{
				Array.isArray(specials) ? specials.map(({_id, title, fileUrl}) => {
					return (
						<div key={_id} className="col-md-6">
							<Link to={`/special/${_id}`} className="text-dark text-decoration-none">
								<Card className="mb-3">
									<CardImg top alt="cards img" src={fileUrl}/>
									<CardBody>
										<CardTitle className="d-flex justify-content-between text-truncate">
											<span className="text-truncate" >{title}</span>
										</CardTitle>
									</CardBody>
								</Card>
							</Link>
						</div>
					)
				}) : ""
			}
		</Fragment>
	)
}

export default SpecialCardOne