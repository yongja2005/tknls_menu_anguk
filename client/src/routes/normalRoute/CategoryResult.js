import React, { useEffect} from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostCardOne from '../../components/post/postCardOne'
import { CATEGORY_FIND_REQUEST } from '../../redux/types'
import { Container, Row } from 'reactstrap'

const CategoryResult = () => {
	const dispatch = useDispatch();
	// useParams mdn 찾아보기
	let { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);
	console.log(categoryFindResult);
  console.log(categoryName);
	useEffect(() => {
		dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);

	return (
		<div>
      <Container className='border-bottom border-dark py-3 mb-3'>
        <h1>7.8 {categoryName} 메뉴</h1>
      </Container>
      <Row>
        <PostCardOne posts={categoryFindResult.posts} />
      </Row>
    </div>
	)
}

export default CategoryResult;
