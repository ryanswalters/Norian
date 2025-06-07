import { useParams } from 'react-router-dom'

export default function PublicAgentPage(){
  const { username='', id='' } = useParams()
  return <div className='py-10'>Public agent {id} from {username}. Coming soon.</div>
}
