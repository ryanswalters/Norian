import { useQuery } from 'wasp/client/operations'
import { codexDebug } from 'wasp/client/operations'

export default function CodexDebugPage(){
  const { data } = useQuery(codexDebug, {})
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
