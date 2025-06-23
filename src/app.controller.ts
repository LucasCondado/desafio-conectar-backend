import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('api')
export class AppController {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  @Get('db-info')
  async getDbInfo() {
    // Nome do banco (funciona para PostgreSQL)
    const dbNameResult = await this.dataSource.query('SELECT current_database()');
    const dbName = dbNameResult[0]?.current_database || 'desconhecido';

    // Tabelas do schema público
    const tables = await this.dataSource.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
    `);

    return {
      status: 'ok',
      database: dbName,
      tables: tables.map((t: any) => t.table_name),
    };
  }
}