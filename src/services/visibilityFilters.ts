import config from '../config';
import http from '../utils/http';
import VisibilityFilters from '../domain/state/visibility-filter/VisibilityFilters';

export async function getVisibilityFilters(): Promise<VisibilityFilters> {
  const { data } = await http.get(config.apis.fetchVisibilityFilters);

  return data.data;
}
