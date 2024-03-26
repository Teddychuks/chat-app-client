import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {} from "@/components/ui/select";

export function Notifications() {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>New request.</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button>Reject</Button>
        <Button variant="outline">Accept</Button>
      </CardFooter>
    </Card>
  );
}
