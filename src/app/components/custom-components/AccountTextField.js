export default function AccountTextField(props) {
  const { title, content } = props;

  return(
    <div className="py-[10px]">
      <div className="mb-[5px]">
        <span className="text-header text-black">{title}</span>
      </div>
      <div>
        <span className="text-normal text-black">{content}</span>
      </div>
    </div>
  )
}