export interface DatabaseConfig {
  getDatabaseName(): string;
  getDatabaseConnectionString(): string;
}
