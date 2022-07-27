const allLeeps = [
    {
        id: 1,
        checked: false,
        floor: 1,
        moving: false,
    },
    {
        id: 2,
        checked: false,
        floor: 2,
        moving: false,
    },
    {
        id: 3,
        checked: true,
        floor: 3,
        moving: false,
    },
    {
        id: 4,
        checked: false,
        floor: 4,
        moving: false,
    },
];

console.log(allLeeps);

const index = allLeeps.filter(arr => arr.checked == false)
// const myCutArr = allLeeps.slice(index, index+1);
console.log(index);