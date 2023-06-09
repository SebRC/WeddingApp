import { FunctionComponent, useEffect, useState } from "react";
import { Guest } from "../../guest/Guest";
import styles from "../Table.module.css";
import { GuestTableRow } from "./GuestTableRow";
import { TableHeader } from "../TableHeader";
import { SortOrder } from "../sortOrder";
import { Searchbar } from "../../searchbar/Searchbar";
import { Flexbox } from "../../layout/flexbox/Flexbox";
import { useTranslator } from "../../../translations/useTranslator";
import { Button } from "../../button/Button";
import { CreateGuestModal } from "../../modal/guest/CreateGuestModal";
import { GuestDetailsPanel } from "../../layout/details/guest/GuestDetailsPanel";
import { NothingFound } from "../../illustrations/NothingFound";
import { LoadingPage } from "../../loading/LoadingPage";
import { Color } from "../../../design/color/Color";

interface GuestTableProps {
  guests: Guest[];
  loading: boolean;
}

export const GuestTable: FunctionComponent<GuestTableProps> = ({ guests, loading }) => {
  const [sortedGuests, setSortedGuests] = useState(guests.slice());
  const [sortOrder, setSortOrder] = useState(SortOrder.Unsorted);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const translator = useTranslator();

  useEffect(() => {
    setSortedGuests(guests);
  }, [guests]);

  const getNextSortOrder = () => {
    if (sortOrder === SortOrder.Unsorted) {
      return SortOrder.Ascending;
    }
    if (sortOrder === SortOrder.Ascending) {
      return SortOrder.Descending;
    }
    return SortOrder.Unsorted;
  };

  const handleSort = (sortOrder: SortOrder) => {
    setSortOrder(sortOrder);
    if (sortOrder === SortOrder.Unsorted) {
      setSortedGuests(guests.slice());
    } else if (sortOrder === SortOrder.Ascending) {
      setSortedGuests(guests.slice().sort((a, b) => Number(b.attending) - Number(a.attending)));
    } else {
      setSortedGuests(guests.slice().sort((a, b) => Number(a.attending) - Number(b.attending)));
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (!value) {
      handleSort(sortOrder);
    } else {
      const filteredGuests = guests.filter((g) => g.name.toLowerCase().includes(value));
      setSortedGuests(filteredGuests);
    }
  };

  const handleRowClick = (id: string, index: number) => {
    if (selectedGuest && id === selectedGuest.id) {
      setSelectedGuest(null);
    } else {
      setSelectedGuest(sortedGuests[index]);
    }
  };

  return (
    <Flexbox flexDirection="column" gap={20}>
      <Flexbox gap={20}>
        <Searchbar value={searchValue} onSearch={(e) => handleSearch(e.target.value.toLowerCase())} />
        <Button onClick={() => setShowModal(true)} text={translator.createGuest()} height="3rem" width="10%" />
      </Flexbox>
      {loading ? (
        <LoadingPage color={Color.Secondary} />
      ) : (
        <Flexbox gap={30}>
          {sortedGuests.length !== 0 ? (
            <table className={styles.table}>
              <TableHeader
                headers={[
                  { name: translator.name(), width: "25%" },
                  {
                    name: translator.attending(),
                    width: "15%",
                    sortable: true,
                    sorted: sortOrder,
                    onSort: () => handleSort(getNextSortOrder()),
                  },
                  { name: translator.songWishes(), width: "30%" },
                  { name: translator.foodInfo(), width: "30%" },
                ]}
              />
              <tbody>
                {sortedGuests.map((g, mainGuestIndex) => {
                  return g.guests ? (
                    g.guests
                      .map((gg, index) => {
                        return (
                          <GuestTableRow
                            guest={gg}
                            key={`${gg.id}-${index}`}
                            onClick={() => handleRowClick(gg.id ?? "", index)}
                          />
                        );
                      })
                      .concat(
                        <GuestTableRow
                          guest={g}
                          key={`${g.id}`}
                          onClick={() => handleRowClick(g.id ?? "", mainGuestIndex)}
                        />
                      )
                      .reverse()
                  ) : (
                    <GuestTableRow
                      guest={g}
                      key={`${g.id}`}
                      onClick={() => handleRowClick(g.id ?? "", mainGuestIndex)}
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <NothingFound />
          )}
          {selectedGuest && <GuestDetailsPanel guest={selectedGuest} onClose={() => setSelectedGuest(null)} />}
        </Flexbox>
      )}

      {showModal && <CreateGuestModal onCancel={() => setShowModal(false)} />}
    </Flexbox>
  );
};
