/** Configuration for router */
export interface RouterConfig {}

/** Configuration for MDM BE */
export interface ApiConfig {
  /** URL pointing to the GraphQL endpoint of running backend instance */
  url: string;
}

/** Configuration for authentication (Keycloak) */
export interface AuthConfig {
  url: string;
  realm: string;
  clientId: string;
}

export interface Config {
  /** Configuration for MDM BE */
  api: ApiConfig;

  /** Configuration for authentication (Keycloak) */
  auth: AuthConfig;

  /** Configuration for router */
  router: RouterConfig;
}

export const getConfig = async (): Promise<Config> => {
  // TODO should we validate config?
  // CONFIG_PATH
  return fetch("/config").then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error("Failed to fetch config"));
  });
};
