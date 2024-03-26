import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { FriendRequest } from "./FriendRequest";
import { Notifications } from "./Notifications";
import { useFriendsList } from "../auth/useAuth";
import LoginSpinner from "../LoginSpinner";

export function Sidebar() {
  const { isFetching, friendsData } = useFriendsList();

  return (
    <div>
      <Command className="border-none h-screen w-[300px] py-2">
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <FriendRequest />
          <CommandGroup heading="Friends List" className="">
            {isFetching ? (
              <LoginSpinner />
            ) : (
              friendsData &&
              friendsData.map((friend, index) => (
                <CommandItem
                  key={index}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200 text-md py-1 cursor-pointer "
                >
                  <span>{friend.friendUsername}</span>
                </CommandItem>
              ))
            )}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
        <Notifications />
      </Command>
    </div>
  );
}
