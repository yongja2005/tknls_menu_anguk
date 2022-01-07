import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SEARCH_REQUEST } from '../../redux/types'
import { Container, Row } from 'reactstrap'
import PostCardOne from '../../components/post/postCardOne'

const Search = () => {
	const dispatch = useDispatch()
	let {searchTerm} = useParams()
	const {searchResult} = useSelector((state) => state.post)

	useEffect(() => {
		if(searchTerm){
			dispatch({
				type:SEARCH_REQUEST,
				payload: searchTerm
			})
		}
	}, [dispatch, searchTerm])

	return (
		<div className='pt-3' >
			<Container className='border-bottom border-dark mb-4'>
				<h1>"{searchTerm}"이(가) 포함된 안국점 메뉴</h1>
			</Container>
			<Row>
				<PostCardOne posts={ searchResult } />
			</Row>
		</div>
	)
}

export default Search
