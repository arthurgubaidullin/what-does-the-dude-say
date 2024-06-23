export type Message = Readonly<{
  channel: string;
  message: string;
  from: string;
  id: string;
  date: Date;
}>;
