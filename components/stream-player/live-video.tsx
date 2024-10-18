export const LiveVideo = () => {

    return (
        <div className="relative h-full flex">
           <iframe  width="100%" height="100%" src="https://www.youtube.com/embed/jfKfPfyJRdk?si=ibCA0tg1tdDY2S6-&autoplay=1"
            title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    )
}