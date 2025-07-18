import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Navigate to='/signup' replace /> } />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blog/:blogId' element={<Blog />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/publish' element={<Publish />} />
        </Routes>
      </BrowserRouter>  
    </div>
  )
}

export default App
