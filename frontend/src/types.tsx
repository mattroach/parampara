

export type Message = {
  type: 'bot';
  message: string;
  navigation?: number;
};

export type Response = {
  type: 'human';
  options: Option[];
};

export type Macro = {
  type: 'macro';
  title: string;
  icon: string;
};

export type Option = {
  message: string;
  navigation?: number;
}

export type Item = Message | Response | Macro;
