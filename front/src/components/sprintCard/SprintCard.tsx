import "./sprintcard.scss";
import { EditOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getUserWithJob } from "../../services/user-service";
import { setModalData, setOpenModal } from "../../context/modalSlice";
import { useDispatch } from "react-redux";
import { TaskModel, UserModel } from "../../types/index";
import { useRef } from "react";

type SprintCardType = {
  item: TaskModel;
  id?: string;
  dragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  dragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
};
export default function SprintCard({
  item,
  id,
  dragEnd,
  dragStart,
}: SprintCardType) {
  const [users, setUsers] = useState<UserModel[]>([]);
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  useEffect(() => {
    getUserWithJob(item, setUsers);
  }, [item]);

  const handleOpenModal = () => {
    const task = { ...item, id };
    dispatch(setModalData(task));
    dispatch(setOpenModal(true));
  };

  return (
    <div
      className="sprint-card"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      draggable
      ref={cardRef}
    >
      <div className="sprint-card-header">
        <p className="card-title">{item?.job}</p>
        <button className="card-btn" onClick={handleOpenModal}>
          <EditOutlined className="card-logo" />
        </button>
      </div>
      <div className="sprint-card-body">
        <p className="sprint-card_title">{item.name}</p>
        <div className="card-users">
          {users &&
            users?.map((user, key) => (
              <img
                key={key}
                width="30"
                height="30"
                className="card-img"
                src={user?.PhotoURL}
                alt="utilisateur travaillant pour le sprint"
                style={{ transform: `translateX(-${10 * key}px)` }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
