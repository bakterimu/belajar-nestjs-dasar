import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

export function createConnection(configService: ConfigService) {
  if (configService.get('DB_CONNECTION') == 'mysql') {
    return new MySqlConnection();
  } else {
    return new MongoDBConnection();
  }
}
