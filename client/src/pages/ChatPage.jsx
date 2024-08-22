import { useEffect, useState } from "react";
import saveIt from "../helpers/saveIt";
import NavBarChat from "../components/NavBarChat"
import background from "../assets/background.png";
import jakarta from "../assets/jakarta.png";
import kualalumpur from "../assets/kualalumpur.png";
import singapore from "../assets/singapore.png";
import ModalForm from "../components/ModalForm";
import formatDate from "../helpers/formatDate";
import getPreview from "../helpers/serverless"
import axios from "axios";
import { Button } from "flowbite-react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
let defaultMessage = [
  {
    "content": "I am an AI called **Hangout AI** will help you to generate itenary from preferences day, time, and location.\n### How to Use \n1. Edit the preference form by clicking the edit icon or the box.\n2. Fill out the preference form.\n3. The details of your preferences will update, including the city's illustration.\n4. Click the Generate button to start a new chat and create your itinerary.\n5. Your chat will not be reset after generating the itinerary, unlike this channel chat.\n6. Enjoy generate itinerary!",
    "role": "system"
  }
]
export default function Page() {
  let text = "Loading.. Loading.. Loading.."
  let [chatId, setChatId] = useState('')
  const [openPreview, setPreview] = useState(false)
  const [dataPreview, setDataPreview] = useState([])
  const [loadingPanel, setLoadingPanel] = useState(false)
  const [loadingList, setLoadingList] = useState(false)
  const [isLoadingChat, setIsLoading] = useState(false)
  const [isGenerating, setGenerate] = useState(false)
  const [messages, setMessages] = useState(defaultMessage)
  const [openModal, setOpenModal] = useState(true);
  const [inputText, setInputText] = useState('');
  const [listChat, setListChat] = useState([]);
  const openTheModal = () => setOpenModal(true);
  const [data, setData] = useState({
    location: "Jakarta",
    startTime: "15:00",
    endTime: "22:00",
    date: new Date().toDateString(),
    latlng: { lat: -6.294531217392458, lng: 106.78474366664888 },
  });
  let locations = {
    Jakarta: jakarta,
    Singapore: singapore,
    "Kuala Lumpur": kualalumpur,
  };

  const fetchChatId = async (id) => {
    try {
      setPreview(false)
      setDataPreview([])
      let response = await axios({
        method: "GET",
        url: "https://hangout-ai-c81439a5ea16.herokuapp.com/chats/" + id,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      setMessages(response.data.messages)
      let str = response.data.name.split(",")
      setData({
        location: str[0],
        date: str[1],
        startTime: str[2],
        endTime: str[3],
        address: data.address,
        latlng: data.latlng
      })

      setChatId(id)
    } catch (error) {
    }
  }
  const moveId = async (id) => {
    if (!id) {
      setChatId('')
      setMessages(defaultMessage)
    }
    else {
      setLoadingPanel(true)
      setChatId(id)
      await fetchChatId(id)
      setLoadingPanel(false)
    }
  }
  const fetchListChat = async () => {
    try {
      setLoadingList(true)
      let { data } = await axios({
        method: "GET",
        url: "https://hangout-ai-c81439a5ea16.herokuapp.com/chats",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      let listing = data.map((el) => {
        let [name, date, startTime, endTime] = el.name.split(",")
        return {
          id: el.id,
          name,
          date,
          subhead: `${startTime} - ${endTime}`
        }
      })
      setListChat([
        {
          id: "",
          name: "First Chat",
          date: new Date().toLocaleDateString("en-EN"),
          subhead: "How To Use Hangout AI"
        },
        ...listing
      ])
    } catch (error) {
    } finally {
      setLoadingList(false)
    }
  }
  const chat = async (e) => {
    e.preventDefault()
    if (inputText.length) {
      let temp = [...messages, { role: "user", content: inputText }]
      setInputText('')
      setIsLoading(true)
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GROQ}`
      };
      try {
        const res = await axios({
          url: "https://api.groq.com/openai/v1/chat/completions",
          method: "POST",
          headers,
          data: {
            model: "llama-3.1-8b-instant",
            temperature: 0,
            messages: temp.map(el => ({ role: el.role, content: el.content })),
            stream: false,
          },
        });
        const { choices } = res.data
        let text = choices[0].message.content.trim();
        setMessages([...temp, { role: "assistant", content: text }])
        setIsLoading(false)
        if (chatId) {
          saveIt(chatId, [...temp, { role: "assistant", content: text }])
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }

  const generate = async (e) => {
    e.preventDefault()
    setLoadingPanel(true)
    setGenerate(true)
    try {
      let response = await axios({
        method: "POST",
        url: "https://hangout-ai-c81439a5ea16.herokuapp.com/generate",
        data,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      setPreview(false)
      setDataPreview([])
      setGenerate(false)
      setMessages(response.data.messages)
      setChatId(response.data.id)
      setLoadingPanel(false)
    } catch (error) {
    }
  }

  const preview = async (metadata) => {
    let cid_array = metadata.map(el => el.cid)
    let data = await getPreview(cid_array)
    setPreview(true)
    let dataFormat = data.map(el => {
      const temp = JSON.parse(el.images).slice(0, 3)
      return { ...el, images: temp }
    })
    setDataPreview(dataFormat)
  }

  const newTab = async (metadata) => {
    let cid_array = metadata.map(el => el.cid)
    let data = await getPreview(cid_array)
    data.forEach((el, index) => {
      console.log(el.link);
      setTimeout(() => {
        window.open(el.link, '_blank');
      }, index * 500); // Delay each tab by 500ms
    })
  }

  const remove = (e) => {
    e.target.hidden = true
  }

  useEffect(() => {
    fetchListChat()
  }, [messages])


  return (
    <div
      style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "100%" }}
      className="bg-bottom sm:bg-opacity-80 md:bg-opacity-0 px-4 py-5 md:px-12 md:pt-8 md:pb-6 sm:min-h-[100vh] h-[100vh] flex flex-col items-center"
    >
      <ModalForm data={data} setData={setData} openModal={openModal} setOpenModal={setOpenModal} />
      <NavBarChat />
      <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-4 w-full px-4 2xl:gap-8">
        <div className="col-span-12 md:col-span-3 flex flex-col space-y-4 md:space-y-2 2xl:gap-4">
          <div className="rounded">
            <p className="text-white text-justify font-myriadl 2xl:text-lg">
              Make your travel plans to Jakarta, Singapore, and Kuala Lumpur with our AI
              Travel Assistant. Tailored to your preferences, let us be your
              guide and discover the world in a way that feels just right for
              you.
            </p>
          </div>
          <div className="border-gradient flex-grow">
            <div className="bg-dark w-full h-full flex flex-col items-center justify-center gap-2 2xl:gap-4 py-3">
              <img className="sm:h-18" src={locations[data.location]} alt={data.location} />
              <p className="text-xl text-white font-bold font-conthrax">{data.location}</p>
            </div>
          </div>
          <div className="border-gradient py-2 2xl:py-10 flex flex-col ">
            <div className="cursor-pointer text-white p-3 rounded-lg flex flex-col  font-myriad">
              <div onClick={() => openTheModal()} className="z-50 mt-0 cursor-pointer p-2.5 rounded-lg flex flex-col justify-between items-between font-myriad cursor-pointer gap-0.5">
                <span className="flex gap-2 text-md 2xl:text-xl font-conthrax">EDIT YOUR PREFERENCE <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.2583 5.8668C17.5833 5.5418 17.5833 5.00013 17.2583 4.6918L15.3083 2.7418C15 2.4168 14.4583 2.4168 14.1333 2.7418L12.6 4.2668L15.725 7.3918M2.5 14.3751V17.5001H5.625L14.8417 8.27513L11.7167 5.15013L2.5 14.3751Z" fill="white" />
                </svg></span>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-teal size-12 flex justify-center items-center rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M13.7668 13.3236C12.9932 13.3236 12.2514 13.0163 11.7044 12.4693C11.1574 11.9223 10.8501 11.1804 10.8501 10.4069C10.8501 9.63335 11.1574 8.89149 11.7044 8.34451C12.2514 7.79753 12.9932 7.49023 13.7668 7.49023C14.5403 7.49023 15.2822 7.79753 15.8292 8.34451C16.3761 8.89149 16.6834 9.63335 16.6834 10.4069C16.6834 10.7899 16.608 11.1692 16.4614 11.5231C16.3148 11.8769 16.1 12.1985 15.8292 12.4693C15.5583 12.7401 15.2368 12.955 14.8829 13.1016C14.5291 13.2481 14.1498 13.3236 13.7668 13.3236ZM13.7668 2.24023C11.6008 2.24023 9.52361 3.10065 7.99206 4.6322C6.46051 6.16374 5.6001 8.24097 5.6001 10.4069C5.6001 16.5319 13.7668 25.5736 13.7668 25.5736C13.7668 25.5736 21.9334 16.5319 21.9334 10.4069C21.9334 8.24097 21.073 6.16374 19.5415 4.6322C18.0099 3.10065 15.9327 2.24023 13.7668 2.24023Z" fill="white" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-lg font-myriadb">{data.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-teal size-12 flex justify-center items-center rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M0 7.49902C0 5.61302 -5.96046e-08 4.67102 0.586 4.08502C1.172 3.49902 2.114 3.49902 4 3.49902H16C17.886 3.49902 18.828 3.49902 19.414 4.08502C20 4.67102 20 5.61302 20 7.49902C20 7.97002 20 8.20602 19.854 8.35302C19.707 8.49902 19.47 8.49902 19 8.49902H1C0.529 8.49902 0.293 8.49902 0.146 8.35302C-8.9407e-08 8.20602 0 7.96902 0 7.49902ZM0 16.499C0 18.385 -5.96046e-08 19.327 0.586 19.913C1.172 20.499 2.114 20.499 4 20.499H16C17.886 20.499 18.828 20.499 19.414 19.913C20 19.327 20 18.385 20 16.499V11.499C20 11.028 20 10.792 19.854 10.645C19.707 10.499 19.47 10.499 19 10.499H1C0.529 10.499 0.293 10.499 0.146 10.645C-8.9407e-08 10.792 0 11.029 0 11.499V16.499Z" fill="white" />
                        <path d="M5 1.5V4.5M15 1.5V4.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-lg font-myriadb">{formatDate(data.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-teal size-12 flex justify-center items-center rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M14.0002 2.33301C20.4437 2.33301 25.6668 7.55617 25.6668 13.9997C25.6668 20.4432 20.4437 25.6663 14.0002 25.6663C7.55666 25.6663 2.3335 20.4432 2.3335 13.9997C2.3335 7.55617 7.55666 2.33301 14.0002 2.33301ZM14.0002 6.99967C13.6907 6.99967 13.394 7.12259 13.1752 7.34138C12.9564 7.56018 12.8335 7.85692 12.8335 8.16634V13.9997C12.8336 14.3091 12.9565 14.6058 13.1753 14.8245L16.6753 18.3245C16.8954 18.537 17.1901 18.6546 17.496 18.652C17.8019 18.6493 18.0945 18.5266 18.3108 18.3103C18.5271 18.094 18.6498 17.8014 18.6524 17.4955C18.6551 17.1896 18.5375 16.8949 18.325 16.6748L15.1668 13.5167V8.16634C15.1668 7.85692 15.0439 7.56018 14.8251 7.34138C14.6063 7.12259 14.3096 6.99967 14.0002 6.99967Z" fill="white" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Start Time</p>
                      <p className="text-lg font-myriadb">{data.startTime}</p>
                    </div>
                    <div className='ml-3'>
                      <p className="font-medium ">End Time</p>
                      <p className="text-lg font-myriadb">{data.endTime}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={generate} className="z-50 mb-2 hover:bg-black font-conthrax bg-teal w-full py-2 rounded-md hover:bg-teal-600 transition-colors  cursor-pointer">
                {isGenerating ? "GENERATING.." : "GENERATE"}
              </button>
            </div>
          </div>
        </div>
        {/* Center Column */}
        <div className="col-span-12 md:col-span-7 flex flex-col space-y-4 h-full  justify-between">
          <div className="flex-grow flex flex-col max-h-[60vh] md:max-h-[70vh]">
            {
              !loadingPanel ? (
                <div className="overflow-auto flex flex-col space-y-4 ">
                  {
                    messages.map((el, i) => {
                      let iframeSrc = ''
                      if (el.latlng) iframeSrc = `https://www.google.com/maps/embed/v1/place?q=${el.latlng.lat},${el.latlng.lng}&key=${import.meta.env.VITE_GMAP}`
                      if (el.role === "user") {
                        return <div key={i} className="flex flex-col rounded-lg max-w-5/6 self-end userchat py-2 px-3">
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
                      } else {
                        return (
                          <div key={i} className="aianswer flex flex-col w-full rounded-lg p-1.5">
                            <div className="flex items-center gap-2 py-2">
                              <div className="ml-2 circleai w-8 h-8 rounded-full"></div>
                              <p className="text-white font-conthrax text-[12px]">HANGOUT AI</p>
                            </div>
                            <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className="prose px-3 py-2 !text-white max-w-full">{el.content}</Markdown>
                            {
                              el.metadata && (
                                <div className="ml-4 p-3 border-s-4 mt-3 mb-4">
                                  <b className="!text-[#A3E8EB]">Metionable :</b>
                                  <ul className="my-1">
                                    {
                                      el.metadata.map((el, j) => <li key={j}>- {el.name}</li>)
                                    }
                                  </ul>
                                  <div className="flex flex-col md:flex-row gap-3 md:gap-2 w-4/6 py-2 md:py-0">
                                    <Button onClick={() => preview(el.metadata)} outline gradientDuoTone="cyanToBlue" className="sm:mt-0 md:mt-2">Open Preview</Button>
                                    <Button onClick={() => newTab(el.metadata)} outline gradientDuoTone="cyanToBlue" className="sm:mt-0 md:mt-2 ">Open New Tab</Button>
                                  </div>
                                  {
                                    openPreview && (
                                      <div className="pt-5 ">
                                        {
                                          dataPreview.map(el => {
                                            let { title, images } = el
                                            return (
                                              <div key={el.cid} className="text-white mb-2">
                                                <p>{title} ({el.category})</p>
                                                <div className="overflow-x-scroll flex h-44 sm:w-[300px] md:w-[96%]">
                                                  {images.map(e => <img key={e.title} src={e.image} alt={e.title} onError={remove} />)}
                                                </div>
                                              </div>
                                            )
                                          })
                                        }
                                      </div>
                                    )
                                  }
                                </div>
                              )
                            }
                          </div>
                        )
                      }
                    })
                  }
                  {
                    (isLoadingChat) && (
                      <div className="aianswer flex flex-col w-full rounded-lg p-1.5">
                        <div className="flex items-center gap-2 py-2">
                          <div className="ml-2 circleai w-8 h-8 rounded-full"></div>
                          <p className="text-white font-conthrax text-[12px]">HANGOUT AI</p>
                        </div>
                        <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className="prose px-3 py-2 !text-white max-w-full">Loading ...</Markdown>
                      </div>
                    )
                  }
                </div>
              ) : (
                <div className="m-auto flex flex-col justify-center items-center p-2 md:p-6 text-white flex-grow">
                  <div className="flex flex-col justify-center border-gradient loading-container m-auto text-xl">
                    <div className="flex justify-center loading-container font-conthrax p-4">
                      {text.split('').map((letter, index) => (
                        <span
                          key={index}
                          className="letter text-sm md:text-2xl font-conthrax"
                          style={{ animationDelay: `${index * 0.04}s` }} // Stagger the animation for each letter
                        >
                          {letter}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className="bottom-0 relative h-28">
            <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} className="absolute w-full h-28 py-2 px-2.5 text-white font-myriadl bg-[#1A1C22] border border-[3px] border-[#6C7B96] h-20 rounded-lg justify-self-end">
            </textarea>
            <Button onClick={chat} size="sm" gradientMonochrome="cyan" className="absolute bg-white right-5 bottom-[20px]">
              Submit
            </Button>
          </div>

        </div>

        {/* Right Column */}
        <div className="hidden col-span-12 md:col-span-2 rounded-2xl md:flex flex-col">
          <div className="border-gradient w-full flex-grow flex flex-col">
            <div className="z-50 bg-dark w-full flex flex-col">
              <p className="text-white text-lg font-conthrax py-2 text-center">List Chat</p>
              <hr />
              <div className="flex flex-col flex-grow overflow-y-auto max-h-[80vh]">
                {listChat.map((el, i) => {
                  let { id, name, date, subhead } = el;
                  if (!id) {
                    return (
                      <div
                        onClick={() => moveId('')}
                        key={i}
                        className="flex gap-2 p-2 group cursor-pointer pt-3.5"
                      >
                        <div className={!chatId ? "w-2 h-2 rounded-full bg-[#4DC0C7] mb-1.5" : "w-2 h-2 rounded-full bg-transparent mb-1.5"}></div>
                        <div className="group-hover:text-[#7deaf2] text-white">
                          <p className="text-sm font-conthrax">{name}</p>
                          <p className="text-sm">{date}</p>
                          <p className="text-sm">{subhead}</p>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        onClick={() => moveId(`${id}`)}
                        key={i}
                        className="group flex gap-2 p-2 cursor-pointer hover:text-[#A3E8EB]"
                      >
                        <div className={Number(chatId) === id ? "w-2 h-2 rounded-full bg-[#4DC0C7] mb-1.5" : "w-2 h-2 rounded-full bg-transparent mb-1.5"}></div>
                        <div className="text-white group-hover:text-[#7deaf2]">
                          <p className="text-sm font-conthrax">{name}</p>
                          <p className="text-sm">{date}</p>
                          <p className="text-sm">{subhead}</p>
                        </div>
                      </div>
                    );
                  }
                })}
                {!listChat.length && loadingList && (
                  <div className="m-auto flex justify-center items-center w-full">
                    <img
                      alt="loading"
                      className="m-auto p-4 w-full"
                      src="https://i.pinimg.com/originals/3e/f0/e6/3ef0e69f3c889c1307330c36a501eb12.gif"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div >
      < footer className="md:hidden mt-8 text-center text-white text-sm" >
        & copy; 2024 Hangout AI.All rights reserved.
      </footer >
    </div >
  );
}
