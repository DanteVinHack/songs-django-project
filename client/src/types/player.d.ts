export interface IPlayer {
  value: ITrack | null;
  isPlay: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  repeat: boolean;
}

export interface IPlayerState extends IPlayer {}

export interface IUsePlayer {
  audio: Ref<HTMLAudioElement>;
  onPause(): void;
  onPlay(): void;
  onLoadedData(event: ChangeEvent<HTMLAudioElement>): void;
  onTimeUpdate(event: ChangeEvent<HTMLAudioElement>): void;
  setTrack(track: ITrack): void;
}
