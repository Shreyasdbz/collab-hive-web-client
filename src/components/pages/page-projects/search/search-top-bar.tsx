import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SearchTopBar = () => {
  return (
    <Card className="shadow-none w-full">
      <CardHeader>
        <CardTitle>Searching for ...</CardTitle>
      </CardHeader>
      <CardContent>
        {/* MOCK - picked filters */}
        <p>
          Role: developer, designer. Technology stack: React, Node.js, MongoDB.
          Project complexity: any
        </p>
      </CardContent>
    </Card>
  );
};

export default SearchTopBar;
