type Props = {
  title?: string
}

export default (props: Props) => {
  return (
    <>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
        </div>
        {props.title && <p className="mt-4 text-gray-500">{props.title}</p>}
      </div>
    </>
  )
}
