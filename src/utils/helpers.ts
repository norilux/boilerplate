export const pushItemToObjectArray = <T extends object> (arr: T[], value: T): T[] => {
    return [ ...arr, value ];
};

export const changeObjectItemInArray = <T extends object>(arr: T[], item: T, field: keyof T): T[] => {
    const newArr = [ ...arr ];

    return newArr.map((ci) => ci[ field ] === item[ field ] ? item : ci);
};

export const deleteObjectItemInArray = <T extends object>(arr: T[], item: T, field: keyof T): T[] => {
    const newArr = [ ...arr ];
    const itemIndex = newArr.findIndex((ci) => ci[ field ] === item[ field ]);
    if (itemIndex >= 0) {
        newArr.splice(itemIndex, 1);
    }

    return newArr;
};
