const getFieldSelection = (fieldNodes, fieldsSelection) => {
  let currentFieldSelection = fieldsSelection;

  for (let i = 0; i < fieldNodes.length; i++) {
    if (fieldNodes[i].selectionSet) {
      currentFieldSelection += `${fieldNodes[i].name.value}{`;
      let selections = fieldNodes[i].selectionSet.selections;
      const index = fieldNodes[i].selectionSet.selections.findIndex(
        f => f.name.value === 'data',
      );
      if (index > -1) {
        // console.log(fieldNodes[i].selectionSet.selections[index]);
        selections =
          fieldNodes[i].selectionSet.selections[index].selectionSet.selections;
      }
      currentFieldSelection = getFieldSelection(
        selections,
        currentFieldSelection,
      );
      currentFieldSelection += '}';
    } else {
      currentFieldSelection += `${fieldNodes[i].name.value}`;
    }

    if (fieldNodes.length - 1 !== i) {
      currentFieldSelection += `,`;
    }
  }
  return currentFieldSelection;
};

module.exports = getFieldSelection;
