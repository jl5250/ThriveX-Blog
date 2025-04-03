'use client'

import { Link } from 'react-scroll'

export default () => {
  return (
    <div className="z-[999] fixed top-[50%] right-[3%] flex flex-col">
      <Link to="panel1" smooth={true} duration={500} className="cursor-pointer">
        导航1
      </Link>
      <Link to="panel2" smooth={true} duration={500} className="cursor-pointer">
        导航2
      </Link>
      <Link to="panel3" smooth={true} duration={500} className="cursor-pointer">
        导航3
      </Link>
      <Link to="panel4" smooth={true} duration={500} className="cursor-pointer">
        导航4
      </Link>
    </div>
  )
}
