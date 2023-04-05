interface IConfig {
  BASE_URL: string;
  get API_URL(): string;
  get TRACK_URL(): string;
  get REGISTER_URL(): string;
  get LOGIN_URL(): string;
  get ME_URL(): string;
}

export const config: Readonly<IConfig> = {
  BASE_URL: "http://localhost:8000",
  get API_URL() {
    return this.BASE_URL + "/api";
  },
  get TRACK_URL() {
    return this.API_URL + "/track/";
  },
  get REGISTER_URL() {
    return this.API_URL + "/auth/register/";
  },
  get LOGIN_URL() {
    return this.API_URL + "/auth/login/";
  },
  get ME_URL() {
    return this.API_URL + "/auth/me/";
  },
};
