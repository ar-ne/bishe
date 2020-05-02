const getTree = (obj: any, id = 0): TreeViewItems[] => {
  if (obj === undefined || obj === null) {
    throw new Error(`WTF?${obj},id${id},type:${typeof obj}`);
  }
  return Object.keys(obj).map(v => {
    const c = obj[v];
    let hasChild = true;
    const t = typeof c;
    if (valueTypes.includes(t)) hasChild = false;
    if (c === null || c === undefined) hasChild = false;
    return {
      id: id++,
      name: hasChild ? v : `${v}: ${c}`,
      children: hasChild ? getTree(c, id++) : undefined,
    };
  });
};

const valueTypes = ['string', 'number', 'boolean'];

export default getTree;

export interface TreeViewItems {
  id: number;
  name: string;
  children?: TreeViewItems[];
}
