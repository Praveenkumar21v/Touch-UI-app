import React, { useEffect } from 'react';
import { useDispatch, useSelector,shallowEqual } from 'react-redux';
import { fetchFeeds } from '../../Containers/GetFeedsSlice';

const GetFeedDataComponent = () => {
  const dispatch = useDispatch();
  const feedsReducer = useSelector((state) => state.feedsReducer || {},shallowEqual);
  const feedData = feedsReducer.data;

  useEffect(() => {
    dispatch(fetchFeeds({ offset: 0, limit: 0 }));
  }, [dispatch]);

  const renderObject = (obj) => {
    return Object.entries(obj).map(([key, value]) => (
      <p key={key}>
        <b>{key}:</b> {value}
      </p>
    ));
  };

  if (!feedData && !feedsReducer.loading) {
    return <div>No data available</div>;
  }
  return (
    <div>
      <div>
        <h2>Feeds:</h2>
        {feedData.map((feed, index) => (
          <div key={index}>
            {renderObject(feed)}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetFeedDataComponent;
