import { useDispatch, useSelector } from "react-redux";
import Setting from "../Setting";
import { useState } from "react";
import { randomizeRoles } from "../../features/playersSlice";

export default function RandomizeRoles() {
  const players = useSelector((store) => store.players);
  const roles = useSelector((store) => store.roles);
  const dispatch = useDispatch();

  const handleRandomizeRoles = () => {
    dispatch(randomizeRoles(roles));
  };

  return (
    <>
      <div className='page'>
        <div className=' max-h-96 flex flex-wrap gap-x-2 gap-y-4 pr-4 overflow-auto'>
          {players.map((player) => (
            <Player key={player.id} player={player} />
          ))}
        </div>

        <button
          className='bg-orange-400 px-4 py-2 rounded-xl text-sm font-medium mt-8 float-right'
          onClick={handleRandomizeRoles}
        >
          Randomize Roles
        </button>
      </div>

      <Setting back='/selecting-roles' next='' condition={true} />
    </>
  );
}

function Player({ player }) {
  const [isActive, setIsActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleActiveOpen = () => {
    setIsActive(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <div
        className={`w-[45%] font-semibold capitalize text-center px-6 py-2 border-2 rounded-xl border-sky-600 transition-all duration-300 ${isActive ? 'bg-sky-600 text-white' : 'bg-transparent text-sky-600'}`}
        onClick={handleActiveOpen}
      >
        {player.name}
      </div>

      <div className='relative'>
        <Modal
          role={player.role}
          openModal={openModal}
          closeModal={handleCloseModal}
        />
      </div>
    </>
  );
}

function Modal({ role, openModal, closeModal }) {
  return (
    <>
      <div
        className={`bg-slate-800/60 fixed inset-0 z-[60] backdrop-blur-lg flex items-center justify-center transition-all duration-300 ${
          openModal ? "opacity-100 visible" : "opacity-0 invisible delay-300"
        }`}
      >
        <div
          className={`bg-gray-700/80 w-[80%] flex flex-col items-center gap-y-10 px-6 py-8 rounded-3xl mb-20 shadow-2xl transition-all duration-300 ${
            openModal
              ? " visible opacity-100 translate-y-0 delay-300"
              : " invisible opacity-0 -translate-y-20"
          }`}
        >
          <span className='text-white/80 text-center font-semibold text-3xl bg-slate-600/50 w-full py-6 rounded-xl shadow-2xl'>
            {role}
          </span>

          <button
            className='text-gray-800 relative uppercase font-medium bg-green-500/80 px-10 py-2 rounded-xl outline outline-2 outline-green-500/80 outline-offset-4 shadow-2xl'
            onClick={closeModal}
          >
            I understood ...
          </button>
        </div>
      </div>
    </>
  );
}
