import NewsList from '../features/news/NewsList'

const Admin = () => {
  return (
    <div className="mx-automin-h-screen mt-4">
      <NewsList admin = {true} />
    </div>
  )
}

export default Admin