import { Injectable } from '@nestjs/common';

//Class provider with different implementation
export class Connection {
  send(): string {
    return null;
  }
}

@Injectable()
export class MySqlConnection extends Connection {
  send(): string {
    return 'MySqlConnection';
  }
}

@Injectable()
export class MongoDBConnection extends Connection {
  send(): string {
    return 'MongoDBConnection';
  }
}
