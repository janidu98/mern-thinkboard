import { Note } from "../models/Note.js";

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1}); // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes: ", error);
    res.status(500).json({ message: error.message });
  }
};

// Get note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({message: "Note not found"});
    res.status(200).json(note);
    
  } catch (error) {
    console.error("Error in getNoteById: ", error);
    res.status(500).json({ message: error.message });
  }
}

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error("Error in createNote: ", error);
    res.status(500).json({ message: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        
        // Debug: Log what you're receiving
        // console.log('Request params ID:', req.params.id);
        // console.log('Request body:', req.body);
        // console.log('Title:', title);
        // console.log('Content:', content);
        
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content},
            {new: true, runValidators: true}  // Added runValidators
        );
        
        // console.log('Updated note from DB:', updatedNote);
        
        if (!updatedNote) {
            return res.status(404).json({message: 'Note not found'});
        }
        
        res.status(200).json({message: 'Note updated successfully', note: updatedNote}); 
        
    } catch (error) {
        console.error('Error in updateNote: ', error);
        res.status(500).json({message: error.message});
    }
}

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });

  } catch (error) {
    console.error("Error in deleteNote: ", error);
    res.status(500).json({ message: error.message });
  }
};
