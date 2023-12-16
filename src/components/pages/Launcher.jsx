import { Link } from "react-router-dom";

export default function Launcher() {
  return (
    <div className='h-screen relative'>
      <img
        className='h-full object-cover brightness-110'
        src='src/assets/images/mafia.jpg'
        alt='mafia'
      />

      <div className='w-full flex flex-col items-center absolute bottom-40 px-8'>
        <h2 className='text-white text-8xl/none font-black uppercase sm:text-9xl'>
          Mafia
        </h2>

        <p className='max-w-[280px] text-gray-200/70 text-[0.825rem] text-center mt-1 mb-16 sm:text-sm'>
          Welcome to the game, this project is under development ...
        </p>

        <Link to='add-players'>
          <button className='bg-sky-600 w-max relative text-white text-lg font-medium px-8 py-3 uppercase outline outline-2 outline-offset-4 outline-sky-600 rounded-full shadow-2xl shadow-sky-600'>
            Let's Start
            <div className='absolute inset-0 outline outline-2 outline-sky-600 outline-offset-4 rounded-full shadow-2xl shadow-sky-600 animate-ping'></div>
          </button>
        </Link>
      </div>

      <p className='absolute bottom-10 left-10 text-gray-400 text-xs'>V 1.0</p>
    </div>
  );
}
