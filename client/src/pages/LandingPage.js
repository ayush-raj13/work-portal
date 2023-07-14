import Wave from "react-wavify";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";

const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0 }
};

const Box = ({ src, desc }) => {

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      className="box"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <div>
        <img className="w-64 h-64" src={src} alt="features"/>
        <div className="font-bold text-lg sm:text-2xl text-center">{desc}</div>
      </div>
    </motion.div>
  );
};


function LandingPage() {
  return (
    <>
    <div 
      className="flex justify-center items-center min-h-screen w-screen bg-no-repeat bg-cover bg-center scroll-smooth"
      style={{
        backgroundImage:`url(${process.env.PUBLIC_URL+ "/img/color-smoke-abstract-wallpaper-aesthetic-background-design.jpg"})`
      }}
    >
      <div className="absolute top-4 right-8 sm:top-2 sm:right-3 text-white hover:scale-110 transition duration-200 opacity-70 hover:opacity-100">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-12 sm:h-12">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
      </svg>
      </div>

      <div className="relative pt-[25px] sm:pt-[122px] lg:pt-[187px] pb-12 sm:pb-[90px] lg:pb-[131px] flex flex-col lg:flex-row space-y-[60px] sm:space-y-[56px] lg:space-x-[386px] justify-between">
            {/* Content Container */}
            <div className="flex flex-col items-center lg:items-start lg:justify-end">
                <div className="font-barlow-condensed text-3xl sm:text-4xl lg:text-5xl  text-[#D0D6F9] tracking-widest leading-[19.2px] sm:leading-6 lg:leading-[33.6px] uppercase">Find Your Future</div>
                <div className="py-4 sm:py-6 lg:py-8 font-bellefair text-[80px] sm:text-[150px] text-white leading-[100px] sm:leading-[150px] lg:leading-[171.9px] uppercase">Career</div>
                <div className="lg:text-left w-[327px] sm:w-[444px] leading-6 sm:leading-7 lg:leading-8 text-center font-barlow text-lg sm:text-xl lg:text-2xl text-[#D0D6F9] tracking-normal">
                    Our platform is designed to guide you every step of the way,
                    from creating your profile to applying for your dream job. start
                    exploring our job listings now and see where your career can
                    take you!
                </div>
            </div>
            {/* Button Container */}
            <div className="mt-[81px] flex justify-center lg:flex-col lg:justify-end">
                <a className="hover:shadow-3xl transition duration-200 py-14 sm:py-20 lg:py-[90px] px-7 sm:px-10 lg:px-11 rounded-full bg-white select-none font-bellefair text-[22px] sm:text-[28px] lg:text-[34px]" href="/find-jobs">EXPLORE</a>
            </div>
      </div>
    </div>
    <Wave 
        className="relative -top-28 lg:-top-36"
        fill='#ffffff'
        paused={false}
        options={{
          height: 20,
          amplitude: 40,
          speed: 0.35,
          points: 2
        }}
    />
    <div className="flex flex-col space-y-16 items-center justify-center w-screen bg-white">
      
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Regain <mark className="px-2 text-white bg-blue-600 rounded">control</mark> over your days</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
        <Box src={process.env.PUBLIC_URL+"/img/find-the-right-job.png"} desc="Find the Right Job" />
        <Box src={process.env.PUBLIC_URL+"/img/research-companies.jpg"} desc="Research Companies" />
        <Box src={process.env.PUBLIC_URL+"/img/apply-to-jobs.jpg"} desc="Apply to Jobs" />
        <Box src={process.env.PUBLIC_URL+"/img/compare-salaries.jpg"} desc="Compare Salaries" />
      </div>

      <div className="flex flex-col space-y-2 sm:space-y-4 text-center font-bold text-lg sm:text-2xl lg:text-4xl pt-36">
        <div><span className="text-violet-900">Unleash</span> your potential and find your dream</div>
        <div>job - Let our <span className="text-violet-900">website</span> guide you to</div>
        <div><span className="text-violet-900">SUCCESS</span>!</div>
        <Button className="text-white font-semibold rounded-2xl bg-violet-700 hover:bg-violet-900 hover:-translate-y-1 hover:shadow-xl shadow-slate-900 transition duration-300 mx-auto py-2 px-4 sm:py-4 sm:px-8">Explore Now</Button>
      </div>

      <div className="flex flex-col items-center space-y-2 sm:space-y-4 lg:space-y-6">
        <div className="font-bold text-lg sm:text-2xl lg:text-4xl pt-72">Companies</div>
        <div className="bg-blue-700 w-[65vw] h-[1px]"/>
      </div>
      
      <div className="flex justify-around w-screen">
      <motion.div
        viewport={{once: false}}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0}}
        transition={{ type: "easeIn", duration: .15, delay: 1 * .15}}
      >
        <img className="h-8 sm:h-16" src={process.env.PUBLIC_URL+"/img/google.png"} alt="google" />
      </motion.div>
      <motion.div
        viewport={{once: false}}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0}}
        transition={{ type: "easeIn", duration: .15, delay: 2 * .15}}
      >
        <img className="h-8 sm:h-16" src={process.env.PUBLIC_URL+"/img/spotify.png"} alt="spotify" />
      </motion.div>
      <motion.div
        viewport={{once: false}}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0}}
        transition={{ type: "easeIn", duration: .15, delay: 3 * .15}}
      >
        <img className="h-8 sm:h-16" src={process.env.PUBLIC_URL+"/img/logoipsum.png"} alt="logoipsum" />
      </motion.div>
      <motion.div
        viewport={{once: false}}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0}}
        transition={{ type: "easeIn", duration: .15, delay: 4 * .15}}
      >
        <img className="h-8 sm:h-16" src={process.env.PUBLIC_URL+"/img/fitbit.png"} alt="fitbit" />
      </motion.div>
      <motion.div
        viewport={{once: false}}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0}}
        transition={{ type: "easeIn", duration: .15, delay: 5 * .15}}
      >
        <img className="h-8 sm:h-16" src={process.env.PUBLIC_URL+"/img/opera.png"} alt="opera" />
      </motion.div>
      <motion.div
        viewport={{once: false}}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0}}
        transition={{ type: "easeIn", duration: .15, delay: 6 * .15}}
      >
        <img className="h-8 sm:h-16" src={process.env.PUBLIC_URL+"/img/blockenzyme.jpg"} alt="blockenzyme" />
      </motion.div>
      </div>
      
      <Footer/>
    </div>
    </>
  )
}

export default LandingPage;