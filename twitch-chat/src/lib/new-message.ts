export type NewMessage = Readonly<{
  channel: string;
  message: string;
  from: string;
}>;
