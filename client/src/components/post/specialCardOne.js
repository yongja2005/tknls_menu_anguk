import React, { Fragment } from 'react';
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'

const SpecialCardOne = ({specials}) => {
	return (
		<Fragment>
			{
				Array.isArray(specials) ? specials.map(({_id, title, fileUrl, discount}) => {
					return (
						<div key={_id} className="col-md-4 col-sm-6 col-6">
							<Link to={`/special/${_id}`} className="text-dark text-decoration-none">
								<Card className="mb-3">
									<CardImg top alt="cards img" src={fileUrl}/>
									<CardBody className='p-0'>
										<CardTitle className="text-truncate pt-2 ps-2">
											<span
												style={{color: "red", textAlign:"left"}}
											>
											♥{discount}% 할인♥
											</span>
											<br />
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