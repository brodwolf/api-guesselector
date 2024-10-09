export interface AppConfig {
  getAppPort(): number;
  getAppSaltSufix(): string;
  getAppEnvironment(): string;
}
