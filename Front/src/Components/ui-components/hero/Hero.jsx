import video from "./video/video.mp4"

const Hero = () => {
  return (
    <section id="hero">
      <video src={video} autoPlay loop muted></video>
    </section>
  )
}

export default Hero