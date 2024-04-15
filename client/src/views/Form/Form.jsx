import React, { useState } from 'react';
import styles from "./Form.module.css"

const Form = ({ onSubmit }) => {
  const [commentBody, setCommentBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(commentBody);
    setCommentBody('');
  };

  return (
    <div className={styles.formContainer}>
    <form onSubmit={handleSubmit}>
      <textarea
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
    </div>
  );
};

export default Form;
