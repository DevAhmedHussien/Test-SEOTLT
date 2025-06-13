import NewsList from '../features/news/NewsList'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <> 
        <div className=" w-full mb-2  mt-2 ">
            <h1 className="text-2xl  mb-4 font-bold text-heading">Привет, клиент!!</h1>
            <Link to={'/admin'} className="text-[12px] px-4 py-3 bg-primary text-white rounded-md ">ДОБАВИТЬ НОВОСТИ</Link>
        </div>

        <h2  className="text-3xl mt-6 mb-9 font-bold text-center"> НОВОСТИ </h2>
        <NewsList admin = {false}/>
    </>
   
  )
}

export default Home