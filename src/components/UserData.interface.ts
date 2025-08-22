export default interface IUserData {
  country: string;
  /** Player UUID */
  sub: string;
  email_verified: boolean;
  player_plocale?: unknown | null;
  country_at: number | null;
  pw: {
    cng_at: number;
    reset: boolean;
    must_reset: boolean;
  };
  phone_number_verified: boolean;
  account_verified: boolean;
  ppid?: unknown | null;
  federated_identity_providers: string[];
  player_locale: string | null;
  acct: {
    type: number;
    state: string;
    adm: boolean;
    game_name: string;
    tag_line: string;
    created_at: number;
  };
  age: number;
  jti: string;
  affinity: {
    [x: string]: string;
  };
}

export const UserData_defaultForInitialization: IUserData = {
  country: "",
  sub: "",
  email_verified: false,
  player_plocale: null,
  country_at: 0,
  pw: {
    cng_at: 0,
    reset: false,
    must_reset: false,
  },
  phone_number_verified: false,
  account_verified: false,
  ppid: null,
  federated_identity_providers: [],
  player_locale: null,
  acct: {
    type: 0,
    state: "",
    adm: false,
    game_name: "",
    tag_line: "",
    created_at: 0,
  },
  age: 0,
  jti: "",
  affinity: {},
};
