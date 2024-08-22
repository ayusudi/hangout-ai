import interactive from "../assets/interactive.png"
import personalize from "../assets/personalize.png"
import seamless from "../assets/seamless.png"
import accuracy from "../assets/accuracy.png"

export default function Component({ keyname }) {

  let data = {
    "Personalized Itineraries": {
      img: personalize,
      message: "Users receive customized dating itineraries tailored to their preferences, ensuring a memorable experience."
    },
    "Instant Recommendations": {
      img: interactive,
      message: "The system delivers the latest suggestions by harnessing large-scale data processing and advanced vector search capabilities."
    },
    "Seamless Interaction": {
      img: seamless,
      message: "The interface allows users to seamlessly request and receive detailed itineraries based on their preferences and inputs."
    },
    "Enhanced Precision": {
      img: accuracy,
      message: "LLMs, embeddings, weather, and location data offer precise, context-aware recommendations."
    }
  }
  return (
    <div className="py-4 gap-1.5 border-gradient flex-1 flex flex-col justify-center md:items-center">
      <div className="flex justify-center items-center gap-2 ">
        <img className="w-16 h-16" src={data[keyname].img} />
        <p className="text-md font-conthrax">{keyname}</p>
      </div>
      <p className="font-myriad mb-2 text-justify">{data[keyname].message}</p>
    </div>
  )
}