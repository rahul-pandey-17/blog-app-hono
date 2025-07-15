import { useParams } from 'react-router-dom'
import { useBlog } from '../hooks'
import { FullBlog } from '../components/FullBlog'
import { BlogSkeleton } from '../components/BlogSkeleton'

export function Blog() {
  const { blogId } = useParams()
  const { loading, blog } = useBlog({
    id: blogId || ''
  })

  if (loading || !blog) {
    return (
      <div>
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    )
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  )
}