import { FunctionComponent, useState } from "react";
import { deleteGuest, deleteUser } from "../../../firebase/firebase";
import { useTranslator } from "../../../translations/useTranslator";
import { Guest } from "../../guest/Guest";
import { Flexbox } from "../../layout/flexbox/Flexbox";
import { Header } from "../../text/Header";
import { Title } from "../../text/Title";
import { Modal } from "./../Modal";

interface DeleteGuestModalProps {
  guest: Guest;
  onCancel: () => void;
  onDelete: () => void;
}

export const DeleteGuestModal: FunctionComponent<DeleteGuestModalProps> = ({ guest, onCancel, onDelete }) => {
  const translator = useTranslator();
  const [loading, setLoading] = useState(false);

  const handleDeleteGuest = async () => {
    setLoading(true);
    const result = await deleteUser(guest.id ?? "");
    if (result.success) {
      await deleteGuest(guest);
      onDelete();
    }
    setLoading(false);
  };

  const getPlusOnes = () => {
    return guest.guestIds?.length !== 0 ? (
      guest.guestIds?.map((g, index) => {
        return <div key={`${g}-${index}`}>{`• ${g.charAt(0).toUpperCase()}${g.slice(1)}`}</div>;
      })
    ) : (
      <p>{translator.noPlusOnes()}</p>
    );
  };

  return (
    <Modal
      onConfirm={async () => await handleDeleteGuest()}
      onCancel={onCancel}
      loading={loading}
      title={translator.deleteGuest()}
    >
      <Flexbox flexDirection="column" gap={20} width="100%">
        <Title title={guest.name} />
        {translator.deleteGuestDescription()}
        <Flexbox flexDirection="column">
          <Header text={translator.plusOnes()} />
          {getPlusOnes()}
        </Flexbox>
      </Flexbox>
    </Modal>
  );
};
