interface ImageLoginProps{
    url : string
}

const ImageLogin = ( { url } : ImageLoginProps) => {
    return (
        <section className="flex overflow-hidden p-5">
             <img className="w-full h-full rounded-4xl object-cover" src={url} alt="" />
        </section>
    )
}

export default ImageLogin