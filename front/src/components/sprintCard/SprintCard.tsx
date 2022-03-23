import "./sprintcard.scss";
import { EditOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getUserWithJob } from "../../context/apiCalls";
import { setModalData, setOpenModal } from "../../context/sprintSlice";
import { useDispatch } from "react-redux";
import { TaskModel, UserModel } from "../../types/index";

type SprintCardType = {
  item: TaskModel;
  id?: string;
};
export default function SprintCard({ item, id }: SprintCardType) {
  const [users, setUsers] = useState<UserModel[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserWithJob(item, setUsers);
  }, [item]);

  const handleOpenModal = () => {
    dispatch(setOpenModal(true));
    dispatch(setModalData({ ...item, id }));
  };

  return (
    <div className="sprint-card" draggable>
      <div className="sprint-card-header">
        <p className="card-title">{item?.job}</p>
        <button className="card-btn" onClick={handleOpenModal}>
          <EditOutlined className="card-logo" />
        </button>
      </div>
      <div className="sprint-card-body">
        <p className="sprint-card_title">{item.task}</p>
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
