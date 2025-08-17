import Auth from '../components/Auth'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Shine from '../components/Shine'

function Home() {
  return (
    <>
      <div className='w-full flex items-center justify-center flex-col gap-5'>
        <Navbar />
        <Shine />
        <Hero />
        <Auth />
      </div>
    </>
  )
}

export default Home