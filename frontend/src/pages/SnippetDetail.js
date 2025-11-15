import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

export default function SnippetDetail() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await api.get(`/snippets/${id}`);
        setSnippet(res.data);
      } catch (err) {
        toast.error('Failed to load snippet');
      } finally {
        setLoading(false);
      }
    };
    fetchSnippet();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!snippet) return <div>Snippet not found</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{snippet.title}</h2>
      <div>
        <strong>Language:</strong> {snippet.language || 'N/A'}<br />
        <strong>Tags:</strong> {snippet.tags ? snippet.tags.join(', ') : 'None'}<br />
        <strong>Visibility:</strong> {snippet.isPublic ? 'Public' : 'Private'}
      </div>
      <pre style={{ background: '#f4f4f4', padding: 10, marginTop: 10 }}>
        {snippet.code}
      </pre>
    </div>
  );
}

