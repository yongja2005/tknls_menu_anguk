import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { 
	Navbar, 
	Container, 
	Nav, 
	NavItem, 
	Form, 
	Button 
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT_REQUEST, POSTS_WRITE_REQUEST } from '../redux/types'
import SearchInput from './search/searchinput'

const AppNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth
  );
  console.log(userRole, "UserRole");

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

	useEffect(() => {
		setIsOpen(false)
	}, [user])


	const addPostClick = () => {
    dispatch({
      type: POSTS_WRITE_REQUEST,
    });
  };
	const addSpecialClick = () => {
    dispatch({
      type: POSTS_WRITE_REQUEST,
    });
  };

	const authLink = (
		<Fragment>
			<NavItem>
        {userRole === "MainAdmin" ? (
          <Form className="col mt-2">
            <Link 
              to="/post"
              className="btn btn-success block text-white px-3 me-3"
              onClick={addPostClick}
            >
              메뉴
            </Link>
						<Link
							to="/special/post"
							className="btn btn-success block text-white px-3 me-3"
							onClick={addSpecialClick}
						>
							특가
						</Link>
          </Form>
        ) : (
          ""
        )}
      </NavItem>
			<NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="/#" className="">
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
		</Fragment>
	)

	const guestLink = (
		<Fragment>

		</Fragment>
	)

	return (
		<Fragment>
			<Navbar color="dark" dark expand="lg" className="sticky-top">
				<Container>
				<Link to="/" className="text-white text-decoration-none">
						안국
				</Link>
				<SearchInput isOpen={isOpen} />
				<Nav className="ml-auto d-flex justfy-content-around" navbar>
					{isAuthenticated ? (
						authLink
					)	: (
						guestLink
					)}
				</Nav>
				</Container>
			</Navbar>
		</Fragment>
	)
};
	

export default AppNavbar;