const world = "world";
export function hello(who: string = world): string {
    return `hellow ${who}`;
}
console.log(hello(world));
