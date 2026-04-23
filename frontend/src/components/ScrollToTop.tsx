import { useEffect } from "react"
import { useLocation, useSearchParams } from "react-router-dom"

const ScrollToTop = () => {

  const { pathname } = useLocation()
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scroll(0, 0)
  }, [pathname, searchParams])

  return null;
}

export default ScrollToTop