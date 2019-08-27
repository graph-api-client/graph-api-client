let fieldsSelection = '';
const getFieldSelection = fieldNodes => {
  for (let i = 0; i < fieldNodes.length; i++) {
    if (fieldNodes[i].selectionSet) {
      fieldsSelection += `${fieldNodes[i].name.value}{`;
      let selections = fieldNodes[i].selectionSet.selections;
      const index = fieldNodes[i].selectionSet.selections.findIndex(
        f => f.name.value === 'data',
      );
      if (index > -1) {
        console.log(fieldNodes[i].selectionSet.selections[index]);
        selections =
          fieldNodes[i].selectionSet.selections[index].selectionSet.selections;
      }
      getFieldSelection(selections);
      fieldsSelection += '}';
    } else {
      fieldsSelection += `${fieldNodes[i].name.value}`;
    }

    if (fieldNodes.length - 1 !== i) {
      fieldsSelection += `,`;
    }
  }
  return fieldsSelection;
};

module.exports = getFieldSelection;
