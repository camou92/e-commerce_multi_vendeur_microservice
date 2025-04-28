import useSeller from 'apps/seller-ui/src/hooks/useSeller'
import useSidebar from 'apps/seller-ui/src/hooks/useSidebar'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SidebarBarWrapper = () => {
  const { activeSidebar, setActiveSidebar} = useSidebar()
  const pathName = usePathname()
  const {seller} = useSeller()

  useEffect(() => {
    setActiveSidebar(pathName);
  }, [pathName,setActiveSidebar])

  const getIconColor = (route:string) => activeSidebar === route ? "#0085ff" : "#969696"

  return (
    <div>SidebarBarWrapper</div>
  )
}

export default SidebarBarWrapper
