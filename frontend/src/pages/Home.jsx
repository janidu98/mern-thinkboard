import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const Home = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/notes');
        
        console.log(response.data);
        setNotes(response.data);
        setIsRateLimited(false);
        setLoading(false);
        
      } catch (error) {
        console.error('Error : ', error);
        if(error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to fetch notes');
        }
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <p className='text-center mt-20 text-lg'>Loading...</p>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && !loading && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
