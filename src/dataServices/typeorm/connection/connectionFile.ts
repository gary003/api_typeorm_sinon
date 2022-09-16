import { DataSourceOptions, QueryRunner, DataSource } from "typeorm"
import { v4 as uuidv4 } from "uuid"

export const connectionTypeORM = async (): Promise<DataSource> => {
  const connectionOptions: DataSourceOptions = {
    name: uuidv4(),
    type: process.env.DB_DRIVER,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: [__dirname + "/../**/entity.*s"],
    synchronize: false,
  } as DataSourceOptions

  const connection: DataSource = new DataSource(connectionOptions)

  await connection.initialize()

  return connection
}

export const createTransactionRunner = async (): Promise<QueryRunner> => {
  const connection = await connectionTypeORM()

  const queryRunner = connection.createQueryRunner()

  await queryRunner.connect()
  await queryRunner.startTransaction()

  return queryRunner
}

export const commitAndQuitTransactionRunner = async (queryRunner: QueryRunner): Promise<boolean> => {
  await queryRunner.commitTransaction()
  await queryRunner.release()
  await queryRunner.connection.destroy()
  return true
}

export const rollBackAndQuitTransactionRunner = async (queryRunner: QueryRunner): Promise<boolean> => {
  await queryRunner.rollbackTransaction()
  await queryRunner.release()
  await queryRunner.connection.destroy()
  return true
}
