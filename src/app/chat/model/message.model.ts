/**
 * The Model of a single message within a chat.
 * ChatComponent's rendering of messages is based on this model.
 */
export class Message {
  own: boolean;
  content: string;
  from: string;
  timeStamp: Date;

  /**
   * @param {string} from The username of the user who sent this message
   * @param {string} content the actual message, that the user wants to send in the chat
   * @param {Date} timeStamp the date & time, when the user did send the message (precision at least to the minute)
   * @param {boolean} own meaning was this message sent by our own client - defaults to false.
   */
  constructor(from: string, content: string, timeStamp: Date, own: boolean = false) {
    this.content = content;
    this.from = from;
    this.timeStamp = timeStamp;
    this.own = own;
  }

  getTimeFormatted(): string {
    this.sanitizeDate();

    if (this.timeStamp == null) {
      return ' - ';
    }
    if (this.today(this.timeStamp)) {
      return `${this.to2Digits(this.timeStamp.getHours())}:${this.to2Digits(this.timeStamp.getMinutes())}`;
    } else {
      return `${this.to2Digits(this.timeStamp.getDay() + 1)}.${this.to2Digits(this.timeStamp.getMonth() + 1)}.${this.timeStamp.getFullYear()}`;
    }
  }

  private to2Digits(n: number): string {
    return ('0' + n).slice(-2);
  }

  private today(d: Date): boolean {
    let today = new Date();
    d = new Date(d);
    return d.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
  }


  private sanitizeDate() {
    this.timeStamp = new Date(this.timeStamp);
  }
}
