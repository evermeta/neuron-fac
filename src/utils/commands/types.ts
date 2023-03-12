export type Payload = void | string | Record<string, unknown>;

export type Command = {
    name: string;
    help?: string;
    action: () => Promise<Payload>;
};
