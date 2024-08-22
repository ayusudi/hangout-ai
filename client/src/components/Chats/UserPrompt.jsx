export default function Component() {
  return (
    <div key={i} className="flex flex-col rounded-lg max-w-5/6 self-end userchat py-2 px-3">
      <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className="prose px-3 py-2 !text-white">{el.content}</Markdown>
      {
        el.latlng && (
          <iframe
            className="px-2 pb-3"
            src={iframeSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        )
      }
    </div>
  )
}