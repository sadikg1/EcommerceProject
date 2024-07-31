
import { Link } from 'react-router-dom'
import Layout from '../Component/Layout'

const PageNotFound = () => {
  return (
      <Layout>
          <div className='pnf'>
             <h1 className='pnf-heading'>404</h1> 
              <p className='pnf-title'>oops!Page Not Found</p> 
              <Link to="/" className='pnf-button'> Go Back</Link>
          </div>
    </Layout>
  )
}

export default PageNotFound