import { WEBHOOK_BE_URL } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/Input";
import { Label } from "../ui/label";

const NodeDetailsCard = ({ node }: { node: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{node.label}</CardTitle>
        <CardDescription>{node.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="font-bold">Metadata</h1>
        <p className="text-muted-foreground">{node.metadata}</p>
        <Label htmlFor="url"></Label>
        <Input
          name="url"
          value={`${WEBHOOK_BE_URL}/hooks/catch/${node?.userId}/${node?.zapId}`}
        />
      </CardContent>
    </Card>
  );
};

export default NodeDetailsCard;
