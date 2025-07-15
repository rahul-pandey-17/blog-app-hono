import { useState, type ChangeEvent } from 'react'
import { AppBar } from '../components/AppBar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

export function Publish() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <div>
      <AppBar />
      <div className='flex justify-center pt-8'>
        <div className='max-w-screen-lg w-full'>
          <input  onChange={(e) => setTitle(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="title" />
        <div className='w-full'>
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          <button onClick={ async() => {
            const token = localStorage.getItem('token')
            const res = await axios.post(`${BACKEND_URL}/blog/create`, {
              title,
              content
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            navigate(`/blog/${res.data.blog.id}`)
          } } type="submit" className="text-white bg-blue-700 hover:bg-blue-800 mt-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer">Publish</button>
        </div>
        </div>
      </div> 
    </div>
  )
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div>
      <div>
        <textarea onChange={onChange} className="block p-2.5 rows={8} w-full h-60 mt-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
      </div>
    </div>
  )
}