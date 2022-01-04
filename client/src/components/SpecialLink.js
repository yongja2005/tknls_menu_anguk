import React, { Fragment } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'

const SpecialLink = () => {
	
	return (
		<div id="special-link" className=''>
			<a href='/special'>
				오늘의<br />
				특가
			</a>
		</div>
	)
};
	

export default SpecialLink;