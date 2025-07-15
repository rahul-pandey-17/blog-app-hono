import { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export interface Blog {
  id: string,
  title: string,
  content: string,
  author: {
    name: string
  }
}

export function useBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<Blog>()

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${BACKEND_URL}/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setBlog(res.data.blog)
      setLoading(false)
    })
    .catch(err => {
    console.error("Failed to fetch blog:", err)
})
  }, [ id ])

  return {
    loading,
    blog
  }
}

export function useBlogs() {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${BACKEND_URL}/blog/bulk`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setBlogs(res.data.blogs)
      setLoading(false)
    })
  }, [])

  return {
    loading,
    blogs
  }
}