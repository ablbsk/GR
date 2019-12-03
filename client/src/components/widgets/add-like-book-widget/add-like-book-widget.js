import React from "react";

import DeleteButton from "../../buttons/delete-button/delete-button";
import ReadButton from "../../buttons/read-button/read-button";
import LikeButton from "../../buttons/like-button/like-button";

const AddLikeBookWidget = ({book, page}) => {
  return (
    <>
      <span>
        {book.readStatus
          ? <DeleteButton goodreadsId={book.goodreadsId} page={page} />
          : <ReadButton goodreadsId={book.goodreadsId} page={page} />
        }
        <span>{book.numberOfEntities}</span>
      </span>
      <span>
        <LikeButton
          goodreadsId={book.goodreadsId}
          likeStatus={book.likeStatus}
          page={page}
        />
        <span>{book.likeCounter}</span>
      </span>
    </>
  )
};

export default AddLikeBookWidget;
