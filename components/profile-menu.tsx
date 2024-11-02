import { HelpCircle, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import type { UserDetail } from "@/types/user";

interface ProfileMenuProps {
  user: UserDetail;
}

function ProfileMenu({ user }: ProfileMenuProps) {
  const { logout } = useAuth();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Avatar>
            <AvatarImage src={user.img} alt={user.firstname} />
            <AvatarFallback>{user.firstname?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <div className="flex items-center gap-3 py-3 px-4">
          <Avatar>
            <AvatarImage src={user.img} alt={user.firstname} />
            <AvatarFallback>{user.firstname?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">
              {user.firstname} {user.lastname}
            </span>
            <span className="text-xs text-muted-foreground">ID-{user.id}</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-1 py-3 px-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-foreground/50"
          >
            <Settings size={16} />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-foreground/50"
          >
            <HelpCircle size={16} />
            Help & Support
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-600/50 hover:text-red-600 hover:bg-red-100"
            onClick={logout}
          >
            <LogOut size={16} />
            Exit
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileMenu;
