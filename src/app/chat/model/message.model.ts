
export class Message {
  own: boolean;
  content: string;
  from: string;
  timeStamp: Date;

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
