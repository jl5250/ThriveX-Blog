import Show from "@/components/Show"
import { Cate } from "@/types/app/cate"
import Link from "next/link"
import { IoIosArrowDown } from "react-icons/io"

interface Props {
  list: Cate[]
  open: boolean
  onClose: () => void
} 

export default ({ list, open, onClose }: Props) => {
  return (
    <>
      <div className={`flex fixed top-0 left-0 ${open ? 'w-full' : 'w-0'} h-full z-[60] transition-width`}>
        <div className={`overflow-auto ${open ? 'w-8/12 p-5' : 'w-0'} dark:border-[#2b333e] bg-[rgba(255,255,255,0.9)] dark:bg-[rgba(44,51,62,0.9)] backdrop-blur-[5px] transition-width hide_sliding`}>
          <ul className="flex flex-col space-y-2">
            {list?.map(one => (
              <li key={one.id} className="group/one relative hover:bg-[#e0e6ec] dark:hover:bg-[#495362] rounded-md  ">
                <Link
                  href={`${one.type === 'cate' ? `/cate/${one.id}?name=${one.name}` : one.url}`}
                  className={`flex justify-between items-center p-3 px-5 text-[15px] group-hover/one:!text-primary   text-[#333] dark:text-white whitespace-nowrap`}
                  onClick={onClose}
                >
                  {one.icon} {one.name}
                  <Show is={!!one.children.length} children={(
                    <IoIosArrowDown className="ml-2" />
                  )} />
                </Link>

                <Show is={!!one.children.length} children={(
                  <ul className="overflow-hidden top-[50px] w-full rounded-md">
                    {one.children?.map(two => (
                      <li key={two.id} className='group/two'>
                        <Link
                          href={`/cate/${two.id}?name=${two.name}`}
                          className="inline-block w-full p-2.5 pl-10 text-[15px] box-border text-[#666] dark:text-[#8c9ab1] hover:!text-primary"
                          onClick={onClose}
                        >
                          {two.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )} />
              </li>
            ))}
          </ul>
        </div>

        <div className={`overflow-hidden h-full bg-[rgba(0,0,0,0.6)] ${open ? 'w-4/12' : 'w-0'}`} onClick={onClose}></div>
      </div>
    </>
  )
}