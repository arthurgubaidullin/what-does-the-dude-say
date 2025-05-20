export interface RemoveChannel {
  readonly remove: (channelId: string) => Promise<void>;
}
