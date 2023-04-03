import { FunctionComponent, useMemo } from "react";
import { useTranslator } from "../../../translations/useTranslator";
import { Guest } from "../../guest/Guest";
import { IconCheckmark } from "../../icons/IconCheckmark";
import { IconX } from "../../icons/IconX";
import { Flexbox } from "../../layout/flexbox/Flexbox";
import { TableData } from "../TableData";
import styles from "../TableRow.module.css";

interface GuestTableRowProps {
  guest: Guest;
}

export const GuestTableRow: FunctionComponent<GuestTableRowProps> = ({ guest }) => {
  const translator = useTranslator();
  const handleSongsClick = () => {
    const text = guest.songWishes.filter((s) => s).join(", ");
    if (text) {
      navigator.clipboard.writeText(filteredSongs);
    }
  };

  const filteredSongs = useMemo(() => {
    return guest.songWishes.filter((s) => s).join(", ");
  }, [guest.songWishes]);

  return (
    <tr className={styles.row}>
      <TableData>{guest.name}</TableData>
      <TableData>
        {guest.attending ? (
          <Flexbox alignItems="center" gap={20}>
            <IconCheckmark /> {translator.yes()}
          </Flexbox>
        ) : (
          <Flexbox alignItems="center" gap={20}>
            <IconX /> {translator.no()}
          </Flexbox>
        )}
      </TableData>
      <TableData onClick={handleSongsClick}>{filteredSongs}</TableData>
      <TableData>{guest.foodInfo}</TableData>
    </tr>
  );
};
