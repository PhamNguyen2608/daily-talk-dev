import dynamic from 'next/dynamic'

const DynamicPortal = dynamic(() => import('./Portal'), {
  ssr: false, // Disable SSR cho component này
})

export default DynamicPortal 