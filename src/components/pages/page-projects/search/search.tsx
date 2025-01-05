import { ProjectsSearchProvider } from "@/providers/projects-search-provider";
import SearchFilters from "./search-filters.client";
import SearchResults from "./search-results.client";
import CreateProjectDialog from "../details/create-project-dialog.client";

const Search = () => {
  return (
    <ProjectsSearchProvider>
      <div className="w-full flex flex-col lg:flex-row items-center justify-start lg:items-start lg:justify-center gap-2">
        {/* Filters */}
        <div className="flex flex-col items-center justify-start gap-2 w-full lg:max-w-sm lg:w-fit">
          <SearchFilters />
          <CreateProjectDialog useFullWidthButton={true} />
        </div>

        {/* Results and pagination */}
        <div className="flex flex-col w-full items-center justify-start gap-1">
          <SearchResults />
        </div>
      </div>
    </ProjectsSearchProvider>
  );
};

export default Search;
