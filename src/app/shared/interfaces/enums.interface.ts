export interface EnumsReponse {
  statuses: [{ id: string; name: string }];
  environments: [{ id: string; name: string }];
  systems: [{ id: string; name: string }];
}
