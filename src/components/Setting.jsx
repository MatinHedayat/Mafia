import { RiMenu5Line } from "react-icons/ri";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Setting({ back, next, condition, handleNextFunc }) {
  return (
    <>
      <div className='setting'>
        <Link to={back}>
          <button className='p-2.5 font-medium'>
            <IoChevronBack className='text-2xl' />
          </button>
        </Link>

        <button className='p-2.5 font-medium'>
          <RiMenu5Line className='text-3xl' />
        </button>

        <Link to={condition && next}>
          <button className='p-2.5 font-medium' onClick={handleNextFunc}>
            <IoChevronForward className='text-2xl' />
          </button>
        </Link>
      </div>
    </>
  );
}
