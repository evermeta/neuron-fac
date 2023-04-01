/******************************************************************************/

import path from 'path';
/******************************************************************************/

export const thisPage = (): string => {
    const _prepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = new Error().stack?.slice(1) as unknown as NodeJS.CallSite[];
    Error.prepareStackTrace = _prepareStackTrace;
    const x = path.parse(stack[0].getFileName() as string);
    return x.name;
}

