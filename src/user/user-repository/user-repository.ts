import { Connection } from '../connection/connection';
import * as console from 'node:console';

//factory provider
export class UserRepository {
  private _connection: Connection;

  save() {
    console.log(`user created, with connection ${this._connection.send()}`);
  }

  get connection(): Connection {
    return this._connection;
  }

  set connection(value: Connection) {
    this._connection = value;
  }
}

export function createUserRepository(connection: Connection) {
  const userRepository = new UserRepository();
  userRepository.connection = connection;
  return userRepository;
}
