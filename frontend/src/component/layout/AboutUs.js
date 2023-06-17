import React from "react"
import me from "./image/me.jpeg"



const AboutUS = () => {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded-[50%]" alt="My self Prince" src={me} />
                    <div className="text-center lg:w-2/3 w-full">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Prince Kumar Paswan</h1>
                        <p className="mb-8 leading-relaxed">Hello there!

                            I'm delighted to introduce myself as a BCA Final year student and a passionate full-stack web developer. My proficiency is in the MERN stack, which comprises React, JavaScript, MongoDB, Express, and Node.js. Alongside these, I also have experience working with various other technologies.

                            Being a student of Bachelor of Computer Applications (BCA), I have gained a solid foundation in computer science and software development. Throughout my academic journey, I've honed my problem-solving skills and acquired a deep understanding of programming principles.

                            However, my true passion lies in web development. I have dedicated countless hours to mastering the MERN stack, allowing me to create robust and dynamic web applications. React has become my go-to front-end framework for building intuitive and user-friendly interfaces. JavaScript is my language of choice for implementing interactive features and functionality.

                            On the back-end, I have become well-versed in utilizing MongoDB as a flexible and scalable NoSQL database. With Express.js, I can create powerful and efficient server-side applications, while Node.js enables me to handle concurrent requests and build scalable web services.

                            Moreover, I constantly stay updated with the latest industry trends and technologies to enhance my skillset. I am always eager to learn and explore new frameworks, libraries, and tools that can further improve my development capabilities.

                            Beyond technical expertise, I am a highly dedicated and detail-oriented individual. I believe in delivering clean, well-structured code while ensuring the best user experience. I also enjoy collaborating with cross-functional teams and thrive in an environment where I can contribute my skills while continuously learning from others.</p>

                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"><a href="mailto: prasantandal123@gmail.com" >E-mail me</a></button>
                            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"><a href="https://github.com/princekumarpaswan" >My GitHub</a></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUS