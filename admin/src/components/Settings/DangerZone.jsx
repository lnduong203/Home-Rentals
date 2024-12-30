import{motion} from 'framer-motion'
import { Trash2 } from 'lucide-react'
const DangerZone = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="rounded-lg border border-red-800 bg-red-900 bg-opacity-50 p-6 shadow-lg backdrop-filter">
        <div className='flex items-center mb-4'>
            <Trash2 className='text-red-400 mr-3 ' size={24}/>
            <h2 className='text-xl font-semibold text-gray-100'>Danger Zone</h2>

        </div>
        <p className='text-gray-300 mb-4'>Permanety delete your account and all of your content.</p>
        <button className='bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded'>Delele Acount</button>
    </motion.div>
  )
}
export default DangerZone