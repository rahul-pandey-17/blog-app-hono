import type { Blog } from '../hooks'
import { AppBar } from './AppBar'
import { Avatar } from './BlogCard'

export function FullBlog({ blog }: { blog: Blog }) {
  return (
    <div>
      <AppBar />
      <div className='flex justify-center'>
        <div className='grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl'>
          <div className='col-span-8'>
            <div className='text-5xl font-extrabold'>
              { blog.title }
            </div>
            <div className='text-slate-500 pt-2'>
              Post on 15th July, 2025
            </div>
            <div className='pt-4'>
              { blog.content }
            </div>
          </div>
          <div className='col-span-4'>
            <div className='text-slate-600 text-lg'>
              Author
            </div>
            <div className='flex w-full'>
              <div className='pr-4 flex flex-col justify-center'>
                <Avatar authorName={ blog.author.name || 'Anonymous' } />
              </div>
              <div>
                <div className='text-xl font-bold'>
                  { blog.author.name || 'Anonymous' }
                </div>
                <div className='pt-2 text-slate-500'>
                  Part time writer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}