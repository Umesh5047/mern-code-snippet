import { Link } from 'react-router-dom';

export default function SnippetCard({ snippet }){
  return (
    <div style={{ border:'1px solid #ddd', padding:12, margin:8 }}>
      <h4><Link to={`/snippet/${snippet._id}`}>{snippet.title}</Link></h4>
      <div><small>{snippet.language} • {snippet.tags?.join(', ')}</small></div>
      <pre style={{ maxHeight:120, overflow:'hidden' }}>{snippet.code}</pre>
    </div>
  );
}

