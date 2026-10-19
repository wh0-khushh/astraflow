export const environment = {
  production: true,
  /* Set at deploy time (or via a config step) to the
     confirmed Python backend URL. Empty = mock data. */
  apiUrl: '',
  dataSource: 'mock' as 'mock' | 'api'
};
