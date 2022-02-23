import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { Post } from "./Post";
import {
  fetchPostsAsync,
  selectPosts,
  selectStates,
  Statuses,
} from "./PostSlice";

function Posts() {
  const posts = useAppSelector(selectPosts);
  const dispatch = useDispatch();
  const status = useAppSelector(selectStates);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div className="card">
        <div className="card-body">
          <h3>{status}</h3>
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <div key={post.id} style={{ margin: "5em" }}>
                  <Post dispatch={dispatch} post={post} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>
      {contents}
    </div>
  );
}

export default Posts;
