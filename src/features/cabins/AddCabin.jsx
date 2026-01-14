import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen((isOpen) => !isOpen)}>
        Add new cabin
      </Button>
      {isModalOpen && (
        <Modal>
          <CreateCabinForm />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
