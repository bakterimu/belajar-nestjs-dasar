import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';
import { ModuleRef } from '@nestjs/core';

//module reference
@Injectable()
export class MemberService {
  constructor(private readonly moduleRef: ModuleRef) {}

  sendEmail(): string {
    const connection: Connection = this.moduleRef.get(Connection);
    return connection.send();
  }
}
