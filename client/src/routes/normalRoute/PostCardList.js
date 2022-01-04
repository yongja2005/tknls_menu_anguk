import React, {Fragment, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POSTS_LOADING_REQUEST } from '../../redux/types'
import { Helmet } from 'react-helmet'
import { Row } from 'reactstrap';
import { GrowingSpinner } from '../../components/spinner/Spinner'
import PostCardOne from '../../components/post/postCardOne'
import Category from '../../components/post/Category'

const PostCardList = () => {
	// redux/reducers/index.js에서 post: postReducer
	const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({type:POSTS_LOADING_REQUEST, payload: 0})
	}, [dispatch]);


	///////////////////////////////
	const skipNumberRef = useRef(0)
	const postCountRef = useRef(0)
	const endMsg = useRef(false)

	postCountRef.current = postCount - 6

	const useOnScreen = (options) => {
    const lastPostElementRef = useRef();

    const [visible, setVisible] = useState(false);

		useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);

				if (entry.isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current;
          if (remainPostCount >= 0) {
            dispatch({
							type: POSTS_LOADING_REQUEST,
              payload: skipNumberRef.current + 6,
            });
						skipNumberRef.current += 6;
					} else {
            endMsg.current = true;
            console.log(endMsg.current);
          }
				}
		}, options);
		
		if (lastPostElementRef.current) {
			observer.observe(lastPostElementRef.current);
		}

		const LastElementReturnFunc = () => {
			if (lastPostElementRef.current) {
				observer.unobserve(lastPostElementRef.current);
			}
		};
			
		return LastElementReturnFunc;
    }, [lastPostElementRef, options]);

		return [lastPostElementRef, visible];
	};


	///////////////////////////////

	const [lastPostElementRef, visible] = useOnScreen({
		// 
    threshold: "0.9"
  });
  console.log(visible, "visible", skipNumberRef.current, "skipNum");

	return (
		<Fragment>
			<Helmet title="Home" />
			<Row className="border-bottom border-dark py-3 mb-3">
        <Category posts={categoryFindResult} />
      </Row>
			<Row>
				{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}
			</Row>
			<div ref={lastPostElementRef}>
				{loading && GrowingSpinner }
			</div>
		</Fragment>
	)
}

export default PostCardList