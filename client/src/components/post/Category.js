import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Categroy = ({ posts }) => {
  return (
    <>
      <div style={{display:'flex', justifyContent:'center'}}>
        {Array.isArray(posts)
          ? posts.map(({ _id, categoryName, posts }) => (
                <Link
                  to={`/post/category/${categoryName}`}
                  className="text-dark text-decoration-none"
                >
                  <span className="p-3">
                    <Button color="dark">
                      {categoryName}
                    </Button>
                  </span>
                </Link>
            ))
          : ""}
      </div>

    </>
  );
};

export default Categroy;