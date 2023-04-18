export class Config {
    constructor(
        public connStr: string = process.env.DB_CONN_STR
      ) {}
}
