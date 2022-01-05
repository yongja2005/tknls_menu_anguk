import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const EditProtectedRoute = ({component: Component, ...rest}) => {
	const { userId } = useSelector((state) => state.auth)
	const { creatorId } = useSelector((state) => state.post)

	return(
		<Route
			{...rest}
			render = {(props) =>{
				if(userId === creatorId) {
					return <Component {...props} />
				} else {
					return (
						<Redirect 
							to={{
								pathname: "/",
								state: {
									from: props.location,
								}
							}}
						/>
					)
				}
			}} 
		/>
	)
}


export const SpEditProtectedRoute = ({component: Component, ...rest}) => {
	const { userId } = useSelector((state) => state.auth)
	const { creatorId } = useSelector((state) => state.special)

	return(
		<Route
			{...rest}
			render = {(props) =>{
				if(userId === creatorId) {
					return <Component {...props} />
				} else {
					return (
						<Redirect 
							to={{
								pathname: "/special",
								state: {
									from: props.location,
								}
							}}
						/>
					)
				}
			}} 
		/>
	)
}

export const ProfileProtectedRoute = ({ component: Component, ...rest }) => {
	// userName : login한 사람 이름
  const { userName } = useSelector((state) => state.auth);
  console.log(userName);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (props.match.params.userName === userName) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};