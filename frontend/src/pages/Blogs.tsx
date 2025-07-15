import { AppBar } from '../components/AppBar'
import { BlogCard } from '../components/BlogCard'
import { BlogSkeleton } from '../components/BlogSkeleton'
import { useBlogs } from '../hooks'

export function Blogs() {
  const { loading, blogs } = useBlogs()

  if (loading) {
    return (
      <div className='flex justify-center'>
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div>
      <AppBar />
      <div className='flex justify-center'>
        <div>
          { blogs.map( (blog, index) => 
            <BlogCard
            key={ index }
            id={ blog.id }
            authorName={ blog.author.name }
            title={ blog.title }
            content={ blog.content }
            publishedDate='(date) will add date logic later'
            />
          ) }
        </div>
      </div>
    </div>
  )
}