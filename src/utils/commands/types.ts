export type Payload = void | string | Record<string, unknown>;

export type Command = {
    name: string;
    action: () => Promise<Payload>;
};
