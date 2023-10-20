import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface props {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

const DataCard = ({ value, label, shouldFormat }: props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-serif font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {shouldFormat ? (
            <span>${value}</span>
          ) : (value)}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
