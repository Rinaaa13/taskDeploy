import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([])
  const [formData, setFormData] = useState({ title: '', content: '' })

  // 1. Fungsi Ambil Data (GET)
  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/notes')
      setNotes(res.data)
    } catch (err) {
      console.error("Gagal ambil data", err)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>📒 My Notes KADA</h1>

      {/* LIST CATATAN */}
      <div style={{ marginTop: '20px' }}>
        {notes.length === 0 ? (
          <p>Memuat data atau database masih kosong...</p>
        ) : (
          notes.map((catatan) => (
            <div key={catatan._id} style={{ 
              border: '1px solid #ddd', 
              padding: '10px', 
              margin: '10px 0', 
              borderRadius: '5px' 
            }}>
              <h3>{catatan.title}</h3>
              <p>{catatan.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App