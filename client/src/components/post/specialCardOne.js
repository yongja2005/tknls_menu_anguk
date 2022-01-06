import React, { Fragment } from 'react';
import { Card, CardBody, CardImg, CardTitle, Badge } from 'reactstrap'
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
									{discount ? (
										<Badge	
											classname=""
											style={{position:'absolute', right:'-5px', top:'-8px', color: "white", background: "red", width:"45px", height:"45px", borderRadius:"50%", lineHeight:"16px"}} 
										>	
											<div>
												{discount}% <br/>할인
											</div>
										</Badge>
									)
									:("")}
									<CardImg top alt="cards img" src={fileUrl}/>
									<CardBody className='p-0'>
										<CardTitle className="text-truncate pt-2 ps-2">
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