
import {Message} from './message.model';

export class SystemMessage extends Message {

  constructor(content: string) {
    super(null, content, null, false);
  }

}
