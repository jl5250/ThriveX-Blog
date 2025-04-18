'use client'

import { MdOutlineError } from "react-icons/md";

interface Props {
    error: Error & { digest?: string }
}

function NotFoundPage({ error }: Props) {
    return (
        <html>
            <body className='bg-white'>
                <div className='mt-24 mx-auto flex flex-col items-center'>
                    <MdOutlineError className="text-[15vw] text-[#ff6262]" />
                    <h1 className='w-6/12 text-[2vw] text-[#888] font-medium mt-8 text-xl'>{error.message}</h1>
                </div>
            </body>
        </html>
    )
}

export default NotFoundPage