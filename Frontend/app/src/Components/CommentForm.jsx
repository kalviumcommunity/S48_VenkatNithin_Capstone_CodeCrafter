import React, { useState } from 'react';
import { supabase } from '../supabaseClient';


const CommentForm = ({ course_id, user_id }) => {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = null;
      // Upload image if provided
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error: uploadError } = await supabase
          .storage
          .from('images')
          .upload(fileName, file);
        if (uploadError) throw uploadError;
        const { publicURL } = supabase.storage.from('images').getPublicUrl(data.path);
        imageUrl = publicURL;
      }

      // Insert comment into Supabase comments table
      const { error: insertError } = await supabase
        .from('comments')
        .insert([{ course_id, user_id, comment, image_url: imageUrl }]);

      if (insertError) throw insertError;

      // Optionally clear form inputs
      setComment('');
      setFile(null);
      alert('Comment submitted!');
    } catch (error) {
      setError(error.message);
      console.error('Error submitting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Comment'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default CommentForm;
