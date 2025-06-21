import React,{ useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import NoteModel from '../components/NoteModel'
import axios from 'axios'
import NoteCard from '../components/NoteCard'
import{toast} from 'react-toastify'
const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [filteredNotes,setFilteredNote] = useState('');
  const [notes,setNotes] = useState([]);
  const [currentNote,setCurrentNote] = useState(null); 
  const [query,setQuery] = useState('');

  useEffect(()=>{
    
    fetchNotes();
  },[]);

  useEffect(()=>{
    setFilteredNote(
      notes.filter((note)=>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  },[query,notes])

  const fetchNotes = async(req,res)=>{
      try{
        const {data} = await axios.get("http://localhost:5000/api/note",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setNotes(data.notes)
      }catch(err){
        console.log(err);
      }
    }

  const closeModel = ()=>{
    setModelOpen(false)
  } 

  const onEdit =(note)=>{
    setCurrentNote(note);
    setModelOpen(true);
  }

  const addNote = async(title,description) =>{
    try{
            const response = await axios.post("http://localhost:5000/api/note/add",{ title,description },{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
            if(response.data.success){
              fetchNotes();
              closeModel();
            };
        }catch(err){
            console.log(err);
        }
  }

  const deleteNote = async(id)=>{
    try{
            const response = await axios.delete(`http://localhost:5000/api/note/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
            if(response.data.success){
              toast.success("note deleted")
              fetchNotes();
             
            };
        }catch(err){
            console.log(err);
        }
  }

  const editNote = async(id,title,description)=>{
    try{
            const response = await axios.put(`http://localhost:5000/api/note/${id}`,{ title,description },{headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
            if(response.data.success){
              fetchNotes();
              closeModel();
            };
        }catch(err){
            console.log(err);
        }
  }

  return (
    <div>
      <Navbar setQuery={setQuery}/>
       

      <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-5'>
        { filteredNotes.length > 0 ? filteredNotes.map((note)=>(
          <NoteCard 
            key ={note._id} 
            note ={note}
            onEdit={onEdit}
            deleteNote={deleteNote}
          />
        )):<p>No notes</p>} 
      </div>

      <button 
      onClick={()=> setModelOpen(true)}
      className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font bold p-4 rounded-full'>
        +
      </button>
      {isModelOpen && <NoteModel 
      closeModel={closeModel}
      addNote={addNote}
      currentNote={currentNote}
      editNote={editNote}
      
      />}
    </div>
  )
}

export default Home
