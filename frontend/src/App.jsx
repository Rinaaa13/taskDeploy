import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. Tentukan URL secara otomatis
  // Jika sedang buka di localhost, pakai port 3000. Jika di internet, pakai coderin.
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/notes' 
    : 'https://coderin.my.id/notes';

  // 2. Fungsi Ambil Data (GET)
  const fetchNotes = async () => {
    try {
      setLoading(true)
      const res = await axios.get(API_URL)
      setNotes(res.data)
      setLoading(false)
    } catch (err) {
      console.error("Gagal ambil data:", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>📒 My Notes KADA</h1>
      
      <p style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
        Terhubung ke: <code style={{ background: '#eee', padding: '2px 4px' }}>{API_URL}</code>
      </p>

      <hr />

      {/* LIST CATATAN */}
      <div style={{ marginTop: '20px' }}>
        {loading ? (
          <p>Sedang menjemput data...</p>
        ) : notes.length === 0 ? (
          <p>Database masih kosong. Coba tambah data lewat Postman!</p>
        ) : (
          notes.map((catatan) => (
            <div key={catatan._id} style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              margin: '10px 0', 
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{catatan.title}</h3>
              <p style={{ margin: 0, color: '#666' }}>{catatan.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App