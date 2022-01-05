import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  USER_LOADING_REQUEST,
  SPECIAL_DETAIL_LOADING_REQUEST,
  SPECIAL_DELETE_REQUEST,
} from "../../redux/types";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { GrowingSpinner } from '../../components/spinner/Spinner';
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";

const SpecialDetail = (req) => {

	const dispatch = useDispatch();
	// client/src/redux/reducers/specialReducer.js
	const { specialDetail, creatorId, title, loading } = useSelector(
    (state) => state.special
  );
	// client/src/redux/reducers/authReducer.js
	const { userId } = useSelector((state) => state.auth);
  
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
      
      <Row className="pt-3 mb-4 d-flex justify-content-between">
        {(() => {
          if (specialDetail && specialDetail.creator) {
            return (
              <Fragment>
                <div
												style={{color: "red", textAlign:"left"}}
											>
											♥특가♥
                </div>
                <div className="font-weight-bold text-big">
                  {specialDetail.title}
                </div>
              </Fragment>
            );
          }
        })()}
      </Row>
      {specialDetail ? (
        <Fragment>
          <Row className="mb-3">
            <CKEditor
              editor={BalloonEditor}
              data={specialDetail.contents}
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

export default SpecialDetail