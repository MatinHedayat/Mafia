import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlayer,
  removePlayer,
  removeAllPlayers,
} from "../../features/playersSlice";
import Setting from "../Setting";

export default function AddPlayers() {
  const [playerName, setPlayerName] = useState("");
  const inputRef = useRef(null);

  const handleClearInput = () => {
    setPlayerName("");
    inputRef.current.focus();
  };

  const players = useSelector((store) => store.players);
  const dispatch = useDispatch();

  const handleSubmission = (e) => {
    e.preventDefault();
    if (!playerName) return;

    dispatch(
      addPlayer({
        id: Date.now(),
        name: playerName,
        role: null,
      })
    );

    handleClearInput();
  };

  const handleRemovePlayer = (id) => dispatch(removePlayer(id));
  const handleRemoveAllPlayers = () => {
    dispatch(removeAllPlayers());
    localStorage.removeItem("players");
  };

  const condition = players.length >= 3;

  return (
    <>
      <div className='page'>
        <form
          className='relative flex rounded-xl shadow-xl'
          onSubmit={handleSubmission}
        >
          <input
            className='w-4/5 pl-6 pr-[20%] py-3 font-medium rounded-l-xl outline-none  caret-sky-600'
            type='text'
            autoFocus
            value={playerName}
            ref={inputRef}
            placeholder='Enter something ...'
            onChange={(e) => setPlayerName(e.target.value)}
          />

          <button
            className='absolute right-1/4 top-1/2 -translate-y-1/2'
            type='button'
            onClick={handleClearInput}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 stroke-sky-600'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z'
              />
            </svg>
          </button>

          <button className='bg-sky-600 w-1/5 flex items-center justify-center text-white font-medium rounded-r-xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.8}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
              />
            </svg>
          </button>
        </form>

        <div className='max-h-80 space-y-3 pr-6 mt-12 overflow-auto sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-4 sm:pr-0 sm:space-y-0'>
          {players.length ? (
            players.map((player, index) => (
              <div
                className='bg-sky-600 w-full relative flex items-center px-6 py-[0.55rem] overflow-hidden rounded-xl sm:w-[48%]'
                key={player.id}
              >
                <span className='bg-white text-sky-600 font-medium absolute -left-6 -top-11 w-24 h-24 flex items-center pl-14 pt-[2.2rem] rounded-full min-500:-left-3 min-500:pl-12'>
                  {index + 1}
                </span>

                <span className='text-white font-medium capitalize ml-16 min-500:ml-20'>
                  {player.name}
                </span>

                <button
                  className='absolute right-6'
                  onClick={() => handleRemovePlayer(player.id)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2.5}
                    stroke='currentColor'
                    className='w-5 h-5 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M18 12H6'
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <span className='w-full block text-gray-200/50 text-sm text-center pl-8 mt-4'>
              Player list is empty ...
            </span>
          )}
        </div>

        {players.length > 2 && (
          <button
            className='bg-rose-600 text-white text-sm font-medium py-2 px-6 mt-6 mr-6 float-right rounded-xl sm:mr-2'
            onClick={handleRemoveAllPlayers}
          >
            Remove all
          </button>
        )}
      </div>

      <Setting back='/' next='/selecting-roles' condition={condition} />
    </>
  );
}
