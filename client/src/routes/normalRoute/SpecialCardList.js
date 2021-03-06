import React, {Fragment, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SPECIALS_LOADING_REQUEST, POSTS_LOADING_REQUEST } from '../../redux/types'
import { Helmet } from 'react-helmet'
import { Row } from 'reactstrap';
import { GrowingSpinner } from '../../components/spinner/Spinner'
import SpecialCardOne from '../../components/post/specialCardOne'

import PostSpecialCardOne from '../../components/post/postSpecialCardOne'

const SpecialCardList = () => {
	// redux/reducers/index.js에서 special: specialReducer
	const { specials, loading, specialCount } = useSelector(
    (state) => state.special
  );

	const { posts } = useSelector(
    (state) => state.post
  );

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({type:SPECIALS_LOADING_REQUEST, payload: 0})
	}, [dispatch]);


	useEffect(() => {
		dispatch({type:POSTS_LOADING_REQUEST, payload: 0})
	}, [dispatch]);


	///////////////////////////////
	const skipNumberRef = useRef(0)
	const specialCountRef = useRef(0)
	const endMsg = useRef(false)

	specialCountRef.current = specialCount - 6

	const useOnScreen = (options) => {
    const lastSpecialElementRef = useRef();

    const [visible, setVisible] = useState(false);

		useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);

				if (entry.isIntersecting) {
          let remainSpecialCount = specialCountRef.current - skipNumberRef.current;
          if (remainSpecialCount >= 0) {
            dispatch({
							type: SPECIALS_LOADING_REQUEST,
              payload: skipNumberRef.current + 6,
            });
						skipNumberRef.current += 6;
					} else {
            endMsg.current = true;
            console.log(endMsg.current);
          }
				}
		}, options);
		
		if (lastSpecialElementRef.current) {
			observer.observe(lastSpecialElementRef.current);
		}

		const LastElementReturnFunc = () => {
			if (lastSpecialElementRef.current) {
				observer.unobserve(lastSpecialElementRef.current);
			}
		};
			
		return LastElementReturnFunc;
    }, [lastSpecialElementRef, options]);

		return [lastSpecialElementRef, visible];
	};


	///////////////////////////////

	const [lastSpecialElementRef, visible] = useOnScreen({
		// 
    threshold: "0.9"
  });
  console.log(visible, "visible", skipNumberRef.current, "skipNum");

	return (
		<Fragment>
			<Helmet title="7.8 안국" />
			<Row className=''>
					<h1 className='border-bottom border-dark pt-3 mb-3'>안국점 오늘의 특가</h1>
				{posts ? <PostSpecialCardOne posts={posts} /> : GrowingSpinner}
				{specials ? <SpecialCardOne specials={specials} /> : GrowingSpinner}
			</Row>
			<div ref={lastSpecialElementRef}>
				{loading && GrowingSpinner }
			</div>
		</Fragment>
	)
}

export default SpecialCardList