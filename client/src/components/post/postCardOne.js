import React, { Fragment } from 'react';
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'

const PostCardOne = ({posts}) => {
	return (
		<Fragment>
			{
				Array.isArray(posts) ? posts.map(({_id, title, fileUrl}) => {
					return (
						<div key={_id} className="col-md-4 col-sm-6 col-6">
							<Link to={`/post/${_id}`} className="text-dark text-decoration-none">
								<Card className="mb-3">
									<CardImg top alt="cards img" src={fileUrl}/>
									<CardBody className='p-0'>
										<CardTitle className="d-flex justify-content-between text-truncate pt-2 ps-2">
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

export default PostCardOne