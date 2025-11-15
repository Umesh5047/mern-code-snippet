import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SnippetCreate(){
  const [title,setTitle]=useState(''); const [code,setCode]=useState(''); const [language,setLanguage]=useState('javascript'); const [tags,setTags]=useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const payload = { title, code, language, tags: tags.split(',').map(t=>t.trim()), isPublic: true };
      const res = await api.post('/snippets', payload);
      toast.success('Snippet created');
      nav(`/snippet/${res.data._id}`);
    } catch (err) { toast.error('Create failed'); }
  };

  return (
    <form onSubmit={submit}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <input value={language} onChange={e=>setLanguage(e.target.value)} placeholder="Language" />
      <textarea value={code} onChange={e=>setCode(e.target.value)} placeholder="Code"></textarea>
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags comma separated" />
      <button>Create</button>
    </form>
  );
}

