import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  USER_LOADING_REQUEST,
  SPECIAL_DETAIL_LOADING_REQUEST,
  SPECIAL_DELETE_REQUEST,
} from "../../redux/types";
import { Button, Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { GrowingSpinner } from '../../components/spinner/Spinner';
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";

// import Comments from '../../components/comments/Comments'

const SpecialDetail = (req) => {

	const dispatch = useDispatch();
	// client/src/redux/reducers/specialReducer.js
	const { specialDetail, creatorId, title, loading } = useSelector(
    (state) => state.special
  );
	// client/src/redux/reducers/authReducer.js
	const { userId } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment)
  
  console.log(req ,": req");
	useEffect(() => {
    dispatch({
      type: SPECIAL_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  },[dispatch, req.match.params.id]);

	const onDeleteClick = () => {
    dispatch({
      type: SPECIAL_DELETE_REQUEST,
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
            to={`/special/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit Special
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
            Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );
  
  const Body = (
    <>
      {userId === creatorId ? EditButton : HomeButton}
      <Row className="border-bottom border-top border-primary p-3 mb-3 d-flex justify-content-between">
        {(() => {
          if (specialDetail && specialDetail.creator) {
            return (
              <Fragment>
                <div className="font-weight-bold text-big">
                  {specialDetail.title}
                </div>
              </Fragment>
            );
          }
        })()}
      </Row>
      {specialDetail && specialDetail.comments ? (
        <Fragment>
          <div className="d-flex justify-content-end align-items-baseline small">

            <span> {specialDetail.date}</span>
            <span>{specialDetail.comments.length}</span>
            <span>{specialDetail.views}</span>
          </div>
          <Row className="mb-3">
            <CKEditor
              editor={BalloonEditor}
              data={specialDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
        
          </Row>
          <Row>
            <Container className="mb-3 border border-blue rounded">
              {
                Array.isArray(comments) ? comments.map(
                  ({ contents, creator, date, _id, creatorName }) => (
                    <div key={_id}>
                      <Row className="justify-content-between p-2">
                        <div className="font-weight-bold">
                          {creatorName ? creatorName : creator}
                        </div>
                        <div className="text-small">
                          <span className="font-weight-light">
                            {date}
                          </span>
                        </div>
                      </Row>
                      <Row className="p-2">
                        <div>{contents}</div>
                      </Row>
                      <hr />
                    </div>
                  )
                ) : "Creator"
              }
            {/* <Comments 
              id={req.match.params.id}
              userId={userId}
              userName={userName}
            /> */}
            </Container>
          </Row>
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

export default SpecialDetail