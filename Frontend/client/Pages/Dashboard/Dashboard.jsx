
import Layout from '../../Component/Layout'
import Usermenu from '../../Component/Usermenu'
import { useAuth } from '../../src/Context/auth';

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 ">
            <Usermenu />
          </div>
          <div className="col-md-9 ">
            <div className="card w-75">
              <h2>User Name:{auth?.user?.name}</h2>
              <h2>User Email:{auth?.user?.email}</h2>
              <h2>User Contact number:{auth?.user?.phone}</h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard

