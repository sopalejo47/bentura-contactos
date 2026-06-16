'use client'

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

interface Contacto {
  id: string
  nombre: string
  empresa: string
  cargo: string
  email: string
}

export default function Home() {
  const [contactos, setContactos] = useState<Contacto[]>([])
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [cargo, setCargo] = useState('')
  const [email, setEmail] = useState('')
  const [mostrarForm, setMostrarForm] = useState(false)

  useEffect(() => {
    cargarContactos()
  }, [])

  async function cargarContactos() {
    const { data } = await supabase.from('contactos').select('*').order('created_at', { ascending: false })
    if (data) setContactos(data as Contacto[])
  }

  async function agregarContacto() {
    if (!nombre) return
    await supabase.from('contactos').insert({ nombre, empresa, cargo, email })
    setNombre('')
    setEmpresa('')
    setCargo('')
    setEmail('')
    setMostrarForm(false)
    cargarContactos()
  }

  async function eliminarContacto(id: string) {
    await supabase.from('contactos').delete().eq('id', id)
    cargarContactos()
  }

  return (
    <main style={{ fontFamily: 'sans-serif', maxWidth: 700, margin: '60px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Contactos</h1>
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer' }}
        >
          + Nuevo contacto
        </button>
      </div>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 32 }}>{contactos.length} contactos</p>

      {mostrarForm && (
        <div style={{ background: '#f9f9f9', borderRadius: 10, padding: 20, marginBottom: 32, display: 'grid', gap: 10 }}>
          <input placeholder="Nombre *" value={nombre} onChange={e => setNombre(e.target.value)} style={inputStyle} />
          <input placeholder="Empresa" value={empresa} onChange={e => setEmpresa(e.target.value)} style={inputStyle} />
          <input placeholder="Cargo" value={cargo} onChange={e => setCargo(e.target.value)} style={inputStyle} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={() => setMostrarForm(false)} style={{ ...btnStyle, background: '#eee', color: '#333' }}>Cancelar</button>
            <button onClick={agregarContacto} style={btnStyle}>Guardar</button>
          </div>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #eee', color: '#999', textAlign: 'left' }}>
            <th style={{ paddingBottom: 10, fontWeight: 500 }}>Nombre</th>
            <th style={{ paddingBottom: 10, fontWeight: 500 }}>Empresa</th>
            <th style={{ paddingBottom: 10, fontWeight: 500 }}>Cargo</th>
            <th style={{ paddingBottom: 10, fontWeight: 500 }}>Email</th>
            <th style={{ paddingBottom: 10, fontWeight: 500 }}></th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
              <td style={{ padding: '14px 0', fontWeight: 500 }}>{c.nombre}</td>
              <td style={{ padding: '14px 0', color: '#555' }}>{c.empresa}</td>
              <td style={{ padding: '14px 0', color: '#555' }}>{c.cargo}</td>
              <td style={{ padding: '14px 0', color: '#888' }}>{c.email}</td>
              <td style={{ padding: '14px 0', textAlign: 'right' }}>
                <button onClick={() => eliminarContacto(c.id)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 16 }}>✕</button>
              </td>
            </tr>
          ))}
          {contactos.length === 0 && (
            <tr><td colSpan={5} style={{ padding: '40px 0', textAlign: 'center', color: '#bbb' }}>Sin contactos todavía</td></tr>
          )}
        </tbody>
      </table>
    </main>
  )
}

const inputStyle: React.CSSProperties = { padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e5e5', fontSize: 14, width: '100%', boxSizing: 'border-box' }
const btnStyle: React.CSSProperties = { background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer' }