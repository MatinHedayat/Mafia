import { useEffect, useState } from "react";
import Setting from "../Setting";
import allRoles from "../../data/roles";
import { useDispatch, useSelector } from "react-redux";
import { filteredSelection, clearSelection } from "../../features/rolesSlice";
import { randomizeRoles } from "../../features/playersSlice";

export default function SelectingRoles() {
  const initialState =
    JSON.parse(localStorage.getItem("gameRoles")) || allRoles;
  const [gameRoles, setGameRoles] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("gameRoles", JSON.stringify(gameRoles));
  }, [gameRoles]);

  const handleSetSelectionWithCount = (id) => {
    setGameRoles(
      gameRoles.map((item) =>
        item.id === id
          ? item.isSelected
            ? { ...item, isSelected: false, selectedCount: 0 }
            : { ...item, isSelected: true, selectedCount: 1 }
          : item
      )
    );
  };

  const handleInc_DecCount = (e, id, operation) => {
    e.stopPropagation();
    setGameRoles(
      gameRoles.map((role) =>
        role.id === id
          ? operation === "inc"
            ? {
                ...role,
                isSelected: true,
                selectedCount: role.selectedCount + 1,
              }
            : role.selectedCount === 0
            ? { ...role, selectedCount: 0 }
            : role.selectedCount === 1
            ? { ...role, isSelected: false, selectedCount: 0 }
            : { ...role, selectedCount: role.selectedCount - 1 }
          : role
      )
    );
  };

  const players = useSelector((state) => state.players);
  const roles = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("select", JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    dispatch(filteredSelection(gameRoles));
  }, [gameRoles]);

  const handleClearSelectedRoles = () => {
    dispatch(clearSelection());
    setGameRoles(
      gameRoles.map((item) =>
        item.isSelected
          ? { ...item, isSelected: !item.isSelected, selectedCount: 0 }
          : item
      )
    );
  };

  const condition = players.length === roles.length;

  return (
    <>
      <div className='page'>
        <div className='relative max-h-96 space-y-3 overflow-auto sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-4 sm:space-y-0'>
          {gameRoles.map((role) => (
            <RoleItem
              key={role.id}
              role={role}
              handleSetSelectionWithCount={handleSetSelectionWithCount}
              handleInc_DecCount={handleInc_DecCount}
            />
          ))}
        </div>

        <div className='flex justify-between mt-10 mb-6'>
          <span className='text-slate-400 text-[0.8rem]'>
            Players : {players.length}
          </span>
          <span className='text-slate-400 text-[0.8rem]'>
            Selected Roles : {roles.length}
          </span>
        </div>

        <button
          className='bg-rose-600  text-white w-max text-sm font-medium py-2 px-6 float-right rounded-xl'
          onClick={handleClearSelectedRoles}
        >
          Clear Selection
        </button>
      </div>
      
      <Setting
        back='/add-players'
        next={`/randomize-roles`}
        condition={condition}
        handleNextFunc={() => dispatch(randomizeRoles(roles))}
      />
    </>
  );
}

function RoleItem({ role, handleSetSelectionWithCount, handleInc_DecCount }) {
  const className = role.isSelected
    ? "bg-sky-600 text-white ml-8 role-shadow"
    : "bg-transparent text-sky-600";
  const handleStopPropagation = (e) => e.stopPropagation();

  if (role.role === "Simple Citizen" || role.role === "Simple Mafia") {
    return (
      <div
        className={`w-5/6 relative flex items-center justify-between px-4 py-2 border-2 border-sky-600 rounded-xl transition-all 
    duration-300 ${className} sm:w-[42%]`}
        onClick={() => handleSetSelectionWithCount(role.id)}
      >
        <span className='font-medium'>{role.role}</span>

        <div
          className='h-full flex absolute right-0 pr-2'
          onClick={handleStopPropagation}
        >
          <button
            className='px-1.5'
            onClick={(e) => handleInc_DecCount(e, role.id, "dec")}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
                clipRule='evenodd'
              />
            </svg>
          </button>

          <span className='w-8 flex items-center justify-center'>
            {role.selectedCount}
          </span>

          <button
            className='px-1.5'
            onClick={(e) => handleInc_DecCount(e, role.id, "inc")}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-5 h-5'
            >
              <path
                fillRule='evenodd'
                d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-5/6 px-4 pl-8 py-2 border-2 border-sky-600 rounded-xl transition-all 
    duration-300 ${className} sm:w-[42%]`}
      onClick={() => handleSetSelectionWithCount(role.id)}
    >
      <span className='font-medium'>{role.role}</span>
    </div>
  );
}
