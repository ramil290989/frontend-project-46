import getTreeKeys from './getTreeKeys.js';

const getNodesWithoutMarkers = (file1Parse, file2Parse) => {
  const keys = getTreeKeys(file1Parse, file2Parse);
  const nodesWithoutMarkers = keys.reduce((node, key) => {
    const nodeItem = { key: '', value: '', status: '' };
    if (typeof file2Parse[key] !== 'object' && typeof file1Parse[key] !== 'object') {
      if (file2Parse === 0) {
        nodeItem.key = key;
        nodeItem.value = file1Parse[key];
        nodeItem.status = 'nomod';
      } else {
        nodeItem.key = key;
        nodeItem.value = file2Parse[key];
        nodeItem.status = 'nomod';
      }
    } else {
      if (file2Parse === 0) {
        nodeItem.key = key;
        nodeItem.value = getNodesWithoutMarkers(file1Parse[key], 0);
        nodeItem.status = 'nomod';
      } else {
        nodeItem.key = key;
        nodeItem.value = getNodesWithoutMarkers(0, file2Parse[key]);
        nodeItem.status = 'nomod';
      }
    }
    node.push(nodeItem);
    return node;
  }, []);
  return nodesWithoutMarkers;
};

export default getNodesWithoutMarkers;
