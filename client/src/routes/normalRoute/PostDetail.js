import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  USER_LOADING_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_REQUEST,
} from "../../redux/types";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { GrowingSpinner } from '../../components/spinner/Spinner';
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";


const PostDetail = (req) => {

	const dispatch = useDispatch();
	// client/src/redux/reducers/postReducer.js
	const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
	// client/src/redux/reducers/authReducer.js
	const { userId } = useSelector((state) => state.auth);
  
  console.log(req ,": req");
	useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  },[dispatch, req.match.params.id]);

	const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

	const EditButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </Fragment>
  );

	const HomeButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            뒤로
          </Link>
        </Col>
      </Row>
    </Fragment>
  );
  
  const Body = (
    <>
      <Row className="pt-3 mb-4 d-flex justify-content-between">
        {(() => {
          if (postDetail && postDetail.creator) {
            return (
              <Fragment>
                <div className="font-weight-bold text-big">
                  {postDetail.title}
                </div>
              </Fragment>
            );
          }
        })()}
      </Row>
      {postDetail ? (
        <Fragment>
          <Row className="mb-3">
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
          {userId === creatorId ? EditButton : HomeButton}
        </Fragment>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );

	return (
    <div>
      <Helmet title={`안국 | ${title}`} />
      { loading === true ? GrowingSpinner : Body}
    </div>
  )
  
	
}

export default PostDetail