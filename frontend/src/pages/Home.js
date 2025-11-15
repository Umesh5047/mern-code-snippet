import { useEffect, useState } from 'react';
import api from '../api';
import SnippetCard from '../components/SnippetCard';
import { toast } from 'react-toastify';

export default function Home(){
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const load = async () => {
      try {
        const res = await api.get('/snippets');
        setSnippets(res.data);
      } catch (err) { toast.error('Failed to load'); }
      setLoading(false);
    }
    load();
  }, []);

  if(loading) return <div>Loading...</div>;
  return (
    <div>
      {snippets.map(s => <SnippetCard key={s._id} snippet={s} />)}
    </div>
  );
}

