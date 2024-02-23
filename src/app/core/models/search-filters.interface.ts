import { FormControl } from '@angular/forms';

export interface ISearchFilters {
  search?: string;
  page_size?: number;
  ordering?: string;
  metacritic?: string;
  platform?: string;
  genres?: string;
  updated?: string;
}

export interface ISearchFiltersForm {
  order: FormControl<string | undefined>;
  genres: FormControl<string | undefined>;
}
