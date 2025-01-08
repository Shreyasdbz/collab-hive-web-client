"use client";

import ErrorBlock from "@/components/common/error-block";
import FetchingBlock from "@/components/common/fetching-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MutedText } from "@/components/ui/typography/muted-text";
import { GetProjectSearchResultsResponseDto } from "@/models/project-dtos";
import useProjectsSearch from "@/providers/projects-search-provider";
import SearchResultsCard from "./search-results-card";

const SearchResults = () => {
  const { searchingPending, results, errorMessage } = useProjectsSearch();

  const Fetching = () => {
    return (
      <FetchingBlock
        message="Looking for projects"
        className="rounded-lg h-80"
      />
    );
  };

  const Empty = () => {
    return (
      <div className="flex justify-center items-center h-80 w-full">
        <MutedText>No results found</MutedText>
      </div>
    );
  };

  const ErrorView = () => {
    return <ErrorBlock message={errorMessage || ""} className="h-80" />;
  };

  const Results = ({
    list,
  }: {
    list: GetProjectSearchResultsResponseDto[];
  }) => {
    return (
      <div className="w-full flex flex-col items-center justify-start gap-2">
        {list.map((project) => (
          <SearchResultsCard key={project.id} {...project} />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full shadow-none rounded-md">
      <CardHeader className="">
        <CardTitle className="">Results</CardTitle>
      </CardHeader>
      <CardContent className="">
        {searchingPending === true && <Fetching />}
        {errorMessage && <ErrorView />}
        {!errorMessage &&
          searchingPending === false &&
          results.length === 0 && <Empty />}
        {!errorMessage && searchingPending === false && results.length > 0 && (
          <Results list={results} />
        )}
      </CardContent>
    </Card>
  );
};

export default SearchResults;
