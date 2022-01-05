import React, { Fragment } from "react";
import Footer from "../components/Footer";
import AppNavbar from '../components/AppNavbar';
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import PostEdit from "./normalRoute/PostEdit";
import CategoryResult from "./normalRoute/CategoryResult";
import Profile from "./normalRoute/Profile";
import { EditProtectedRoute, ProfileProtectedRoute, SpEditProtectedRoute } from './protectedRoute/ProtectedRoute';
import LoginModal from '../components/auth/loginModal';

import SpecialCardList from './normalRoute/SpecialCardList';
import SpecialWrite from './normalRoute/SpecialWrite';
import SpecialDetail from './normalRoute/SpecialDetail';
import SpecialEdit from './normalRoute/SpecialEdit'
import SpecialLink from '../components/SpecialLink';

const MyRouter = () => (
  <Fragment>
    <AppNavbar />
    <SpecialLink />
    <Container 
      id="main-body"
      style={{margin:"0 auto", overflowY:"scroll", overflowX:"hidden"}}
    >
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/admin_login" exact component={LoginModal} />
        <Route path="/post" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />

        <Route path="/special" exact component={SpecialCardList} />
        <Route path="/special/post" exact component={SpecialWrite} />
        <Route path="/special/:id" exact component={SpecialDetail} />

        <SpEditProtectedRoute 
          path="/special/:id/edit" exact component={SpecialEdit}
        />

        <EditProtectedRoute 
          path="/post/:id/edit" exact component={PostEdit}
        />

        <Route
          path="/post/category/:categoryName"
          exact
          component={CategoryResult}
        />

        <Route path="/search/:searchTerm" exact component={Search} />
        <ProfileProtectedRoute
          path="/user/:userName/profile"
          exact
          component={Profile}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </Fragment>
);

export default MyRouter;