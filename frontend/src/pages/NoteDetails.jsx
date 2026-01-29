import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";

const NoteDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await api.get(`/api/notes/${id}`);
        setNote(note.data);
      } catch (error) {
        console.error("Error fetching note: ", error);
        toast.error("Failed to fetch note details");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.put(`/api/notes/${id}`, note);
      toast.success("Note saved successfully");
      navigate("/");
    } catch (error) {
      console.error("Error with creating note: ", error);
      if (error.response.status === 429) {
        toast.error("Rate limit exceeded. Please try again later.");
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setLoading(true);

    try {
      await api.delete(`/api/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");

    } catch (error) {
      console.error("Error deleting note: ", error);
      toast.error("Failed to delete note");

    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>

            <button className="btn btn-ghost mb-6" onClick={handleDelete}>
              <Trash2Icon className="size-5 text-error" />
              <p className="text-red-400">Delete Note</p>
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    value={note.title}
                    onChange={(e) => setNote({...note, title: e.target.value})}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    value={note.content}
                    onChange={(e) => setNote({...note, content: e.target.value})}
                    className="textarea textarea-bordered h-32"
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
