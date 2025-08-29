import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const CommentList = ({ course_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('course_id', course_id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [course_id]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Discussion</h3>
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <p><strong>User:</strong> {comment.user_id}</p>
            <p>{comment.comment}</p>
            {comment.image_url && (
              <img
                src={comment.image_url}
                alt="Attached"
                style={{ maxWidth: '200px', marginTop: '0.5rem' }}
              />
            )}
            <p style={{ fontSize: '0.8rem', color: '#555' }}>
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
