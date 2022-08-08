import Card from "../styled/Card";
import { HiOutlinePencil } from "react-icons/hi";
import { useState, memo } from "react";
import EditAccountModal from "./EditAccountModal";

function AccountInfo({ user }) {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      <Card title="Account">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-semibold text-xl">
              {user.first_name + " " + user.last_name}
            </h1>
            <h1 className="text-gray-500 text-lg">{user.email}</h1>
          </div>
          <button
            onClick={() => {
              setShowEditModal(!showEditModal);
            }}
            className="btn btn-sm btn-ghost btn-active gap-2"
          >
            <HiOutlinePencil className="h-5 w-5" />
            Edit
          </button>
        </div>
      </Card>
      {/* {showEditModal && (
        <EditAccountModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          user={user}
        />
      )} */}
    </>
  );
}

export default memo(AccountInfo);
